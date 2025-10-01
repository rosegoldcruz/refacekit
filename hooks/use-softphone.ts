"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { Web as SIPWeb, UserAgent, Registerer, Inviter, Invitation, SessionState } from 'sip.js'

interface SoftphoneConfig {
  sipServer: string
  sipUsername: string
  sipPassword: string
  sipExtension: string
  autoRegister?: boolean
}

interface CallSession {
  phoneNumber: string
  startTime: Date
  leadId?: number
  contactName?: string
}

export function useSoftphone(config: SoftphoneConfig) {
  const [isRegistered, setIsRegistered] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [currentCall, setCurrentCall] = useState<CallSession | null>(null)
  const [callState, setCallState] = useState<'idle' | 'ringing' | 'connected' | 'ended'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [callDuration, setCallDuration] = useState(0)
  
  const userAgentRef = useRef<UserAgent | null>(null)
  const registererRef = useRef<Registerer | null>(null)
  const currentSessionRef = useRef<Inviter | Invitation | null>(null)
  const callTimerRef = useRef<NodeJS.Timeout | null>(null)
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize remote audio element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      remoteAudioRef.current = new Audio()
      remoteAudioRef.current.autoplay = true
    }
  }, [])

  // Register SIP user agent
  const register = useCallback(async () => {
    try {
      setIsConnecting(true)
      setError(null)

      const uri = UserAgent.makeURI(`sip:${config.sipUsername}@${config.sipServer}`)
      if (!uri) {
        throw new Error('Failed to create SIP URI')
      }

      const transportOptions = {
        server: `wss://${config.sipServer}:7443`,
        traceSip: true
      }

      const userAgentOptions = {
        uri,
        transportOptions,
        authorizationUsername: config.sipUsername,
        authorizationPassword: config.sipPassword,
        displayName: config.sipExtension,
        logBuiltinEnabled: true,
        delegate: {
          onInvite: (invitation: Invitation) => {
            handleIncomingCall(invitation)
          }
        }
      }

      const userAgent = new UserAgent(userAgentOptions)
      const registerer = new Registerer(userAgent)

      userAgentRef.current = userAgent
      registererRef.current = registerer

      await userAgent.start()
      await registerer.register()

      setIsRegistered(true)
      setIsConnecting(false)
      console.log('[SOFTPHONE] Registered successfully')
    } catch (err) {
      console.error('[SOFTPHONE] Registration failed:', err)
      setError(err instanceof Error ? err.message : 'Registration failed')
      setIsConnecting(false)
      setIsRegistered(false)
    }
  }, [config])

  // Unregister
  const unregister = useCallback(async () => {
    try {
      if (registererRef.current) {
        await registererRef.current.unregister()
      }
      if (userAgentRef.current) {
        await userAgentRef.current.stop()
      }
      setIsRegistered(false)
      console.log('[SOFTPHONE] Unregistered')
    } catch (err) {
      console.error('[SOFTPHONE] Unregister failed:', err)
    }
  }, [])

  // Place outbound call
  const call = useCallback(async (phoneNumber: string, leadId?: number, contactName?: string) => {
    try {
      if (!userAgentRef.current) {
        throw new Error('User agent not initialized')
      }

      const target = UserAgent.makeURI(`sip:${phoneNumber}@${config.sipServer}`)
      if (!target) {
        throw new Error('Failed to create target URI')
      }

      const inviter = new Inviter(userAgentRef.current, target)
      currentSessionRef.current = inviter

      // Setup session state change handler
      inviter.stateChange.addListener((state: SessionState) => {
        console.log('[SOFTPHONE] Session state:', state)
        
        switch (state) {
          case SessionState.Establishing:
            setCallState('ringing')
            break
          case SessionState.Established:
            setCallState('connected')
            startCallTimer()
            setupRemoteMedia(inviter)
            break
          case SessionState.Terminated:
            setCallState('ended')
            stopCallTimer()
            endCall()
            break
        }
      })

      await inviter.invite()

      setCurrentCall({
        phoneNumber,
        startTime: new Date(),
        leadId,
        contactName
      })

      console.log('[SOFTPHONE] Calling:', phoneNumber)
    } catch (err) {
      console.error('[SOFTPHONE] Call failed:', err)
      setError(err instanceof Error ? err.message : 'Call failed')
      setCallState('idle')
    }
  }, [config])

  // Handle incoming call
  const handleIncomingCall = useCallback((invitation: Invitation) => {
    currentSessionRef.current = invitation

    const remoteIdentity = invitation.remoteIdentity.uri.toString()
    const phoneNumber = remoteIdentity.split('@')[0].replace('sip:', '')

    setCurrentCall({
      phoneNumber,
      startTime: new Date()
    })
    setCallState('ringing')

    invitation.stateChange.addListener((state: SessionState) => {
      switch (state) {
        case SessionState.Established:
          setCallState('connected')
          startCallTimer()
          setupRemoteMedia(invitation)
          break
        case SessionState.Terminated:
          setCallState('ended')
          stopCallTimer()
          endCall()
          break
      }
    })

    console.log('[SOFTPHONE] Incoming call from:', phoneNumber)
  }, [])

  // Answer incoming call
  const answer = useCallback(async () => {
    try {
      const session = currentSessionRef.current
      if (session instanceof Invitation) {
        await session.accept()
        console.log('[SOFTPHONE] Call answered')
      }
    } catch (err) {
      console.error('[SOFTPHONE] Answer failed:', err)
      setError(err instanceof Error ? err.message : 'Answer failed')
    }
  }, [])

  // Hangup call
  const hangup = useCallback(async () => {
    try {
      const session = currentSessionRef.current
      if (session) {
        if (session.state === SessionState.Established) {
          await session.bye()
        } else if (session instanceof Inviter) {
          await session.cancel()
        }
        console.log('[SOFTPHONE] Call ended')
      }
      endCall()
    } catch (err) {
      console.error('[SOFTPHONE] Hangup failed:', err)
      endCall()
    }
  }, [])

  // Setup remote audio stream
  const setupRemoteMedia = useCallback((session: Inviter | Invitation) => {
    const remoteStream = new MediaStream()
    const sessionDescriptionHandler = session.sessionDescriptionHandler
    
    if (sessionDescriptionHandler && 'peerConnection' in sessionDescriptionHandler) {
      const pc = (sessionDescriptionHandler as any).peerConnection
      
      pc.getReceivers().forEach((receiver: RTCRtpReceiver) => {
        if (receiver.track) {
          remoteStream.addTrack(receiver.track)
        }
      })

      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = remoteStream
        remoteAudioRef.current.play().catch(err => {
          console.error('[SOFTPHONE] Audio play failed:', err)
        })
      }
    }
  }, [])

  // Start call duration timer
  const startCallTimer = useCallback(() => {
    setCallDuration(0)
    callTimerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)
  }, [])

  // Stop call duration timer
  const stopCallTimer = useCallback(() => {
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current)
      callTimerRef.current = null
    }
  }, [])

  // End call cleanup
  const endCall = useCallback(() => {
    currentSessionRef.current = null
    setCallState('ended')
    stopCallTimer()
    
    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = null
    }

    // Keep currentCall data for disposition modal
    // Don't clear it here - let the disposition handler clear it
  }, [stopCallTimer])

  // Auto-register on mount - NOW ENABLED with Asterisk WSS configured
  useEffect(() => {
    if (config.autoRegister !== false) {
      register()
    }

    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    // State
    isRegistered,
    isConnecting,
    currentCall,
    callState,
    callDuration,
    error,
    
    // Actions
    register,
    unregister,
    call,
    answer,
    hangup
  }
}
