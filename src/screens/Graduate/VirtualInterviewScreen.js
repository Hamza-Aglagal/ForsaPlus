import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  LogBox
} from 'react-native';
import { Camera, useCameraDevices, CameraRuntimeError } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';

// Ignore specific warnings related to camera
LogBox.ignoreLogs(['Frame processors are only available']);

const VirtualInterviewScreen = ({ navigation, route }) => {
  // Interview configuration from route params or default values
  const { category = 'technical', level = 'intermediate' } = route?.params || {};
  
  // Camera and permission states
  const devices = useCameraDevices();
  const [device, setDevice] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  
  // Camera preferences
  const [preferredCameraPosition, setPreferredCameraPosition] = useState('front');
  
  // Interview states
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [videoUri, setVideoUri] = useState(null);
  
  // References
  const cameraRef = useRef(null);
  const timerRef = useRef(null);
  
  // Setup camera device when available
  useEffect(() => {
    console.log('Camera devices:', JSON.stringify(devices));
    
    if (preferredCameraPosition === 'front') {
      // Try to find front camera
      if (devices.front) {
        console.log('Using front camera (selfie mode)');
        setDevice(devices.front);
        return;
      }
      
      // Try to find any camera that might be front-facing by name
      const deviceKeys = Object.keys(devices);
      const potentialFrontCamera = deviceKeys.find(key => {
        const device = devices[key];
        return device && (
          device.name?.toLowerCase().includes('front') || 
          device.name?.toLowerCase().includes('selfie') ||
          device.name?.toLowerCase().includes('user')
        );
      });
      
      if (potentialFrontCamera) {
        console.log(`Found potential front camera by name: ${devices[potentialFrontCamera].name}`);
        setDevice(devices[potentialFrontCamera]);
        return;
      }
    } else {
      // Using back camera
      if (devices.back) {
        console.log('Using back camera');
        setDevice(devices.back);
        return;
      }
    }
    
    // Fallback to any available camera if preferred camera not found
    if (Object.keys(devices).length > 0) {
      const firstDevice = devices[Object.keys(devices)[0]];
      console.log('Using available camera:', firstDevice?.name || 'unknown');
      setDevice(firstDevice);
    }
  }, [devices, preferredCameraPosition]);
  
  // Toggle between front and back cameras
  const toggleCamera = () => {
    setPreferredCameraPosition(prev => prev === 'front' ? 'back' : 'front');
  };
  
  // Request camera permissions
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        console.log('Requesting camera permissions');
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          ]);
          
          console.log('Android permissions result:', granted);
          
          if (
            granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Camera permissions granted on Android');
            setHasPermission(true);
          } else {
            console.log('Camera permissions denied on Android');
            setHasPermission(false);
            Alert.alert(
              'Permissions Required',
              'Camera and microphone permissions are required for the virtual interview.'
            );
          }
        } else {
          // iOS permissions
          const cameraPermission = await Camera.requestCameraPermission();
          const micPermission = await Camera.requestMicrophonePermission();
          
          console.log('iOS permissions:', { cameraPermission, micPermission });
          
          if (cameraPermission === 'authorized' && micPermission === 'authorized') {
            setHasPermission(true);
          } else {
            setHasPermission(false);
            Alert.alert(
              'Permissions Required',
              'Camera and microphone permissions are required for the virtual interview.'
            );
          }
        }
      } catch (error) {
        console.error('Error requesting permissions:', error);
        setHasPermission(false);
        setCameraError('Permission request failed: ' + error.message);
      }
    };
    
    requestPermissions();
    
    // Cleanup function
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  
  // Handle camera errors
  const onCameraError = (error) => {
    console.error('Camera error:', error);
    setCameraError(error.message || 'Unknown camera error');
    
    if (error instanceof CameraRuntimeError) {
      switch (error.code) {
        case 'camera-not-available':
          Alert.alert('Error', 'Camera is not available on this device');
          break;
        case 'permission-denied':
          Alert.alert('Error', 'Camera permission denied');
          break;
        default:
          Alert.alert('Camera Error', `An error occurred: ${error.message}`);
      }
    }
  };
  
  // Start a new interview session
  const startInterview = () => {
    console.log("Starting interview");
    setInterviewStarted(true);
  };
  
  // Start recording with error handling
  const startRecording = async () => {
    try {
      if (!cameraRef.current) {
        console.log('Camera ref not available');
        Alert.alert('Error', 'Camera not initialized');
        return;
      }
      
      console.log('Starting video recording');
      await cameraRef.current.startRecording({
        onRecordingFinished: (video) => {
          console.log("Video recording finished:", video);
          setVideoUri(video.path);
        },
        onRecordingError: (error) => {
          console.error('Recording error:', error);
          Alert.alert('Error', 'Failed to record video: ' + error.message);
        },
      });
      
      // Start timer
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
      
      setRecording(true);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      Alert.alert('Error', 'Failed to start recording: ' + error.message);
    }
  };
  
  // Stop recording
  const stopRecording = async () => {
    try {
      // Stop video recording
      if (cameraRef.current && recording) {
        await cameraRef.current.stopRecording();
      }
      
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      setRecording(false);
      
      // Show a dialog to confirm submission
      Alert.alert(
        'Submit Response',
        'Are you ready to submit your response?',
        [
          {
            text: 'No, Re-record',
            style: 'cancel',
            onPress: () => {
              // Reset recording state
              setVideoUri(null);
            }
          },
          {
            text: 'Yes, Submit',
            onPress: () => {
              Alert.alert('Success', 'Response submitted successfully!');
            }
          }
        ]
      );
      
    } catch (error) {
      console.error('Error stopping recording:', error);
      Alert.alert('Error', 'Failed to stop recording: ' + error.message);
    }
  };
  
  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Go back handling
  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } else {
      console.log('Navigation goBack not available');
    }
  };
  
  // Render interview start screen
  if (!interviewStarted) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.graduate, '#1E8E7E']}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleGoBack}
          >
            <Icon name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Entretien virtuel</Text>
            <Text style={styles.headerSubtitle}>Préparez-vous pour l'entretien</Text>
          </View>
        </LinearGradient>
        
        <View style={styles.startContainer}>
          <Icon name="video" size={80} color={colors.graduate} />
          <Text style={styles.startTitle}>Prêt pour commencer ?</Text>
          <Text style={styles.startDescription}>
            Vous allez participer à un entretien virtuel qui analysera vos réponses
            pour vous aider à améliorer vos compétences en entretien.
          </Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Icon name="folder-outline" size={24} color={colors.graduate} />
              <Text style={styles.infoText}>Catégorie: {category}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Icon name="signal" size={24} color={colors.graduate} />
              <Text style={styles.infoText}>Niveau: {level}</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.startButton}
            onPress={startInterview}
          >
            <Text style={styles.startButtonText}>Commencer l'entretien</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  // Render permission request
  if (hasPermission === null) {
    return (
      <View style={styles.permissionContainer}>
        <ActivityIndicator size="large" color={colors.graduate} />
        <Text style={styles.permissionText}>Requesting camera and microphone permissions...</Text>
      </View>
    );
  }
  
  // Render permission denied
  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Icon name="camera-off" size={48} color={colors.error || 'red'} />
        <Text style={styles.permissionText}>
          Camera and microphone access is required for the virtual interview.
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={handleGoBack}
        >
          <Text style={styles.permissionButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  // Render the interview in progress
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.graduate, '#1E8E7E']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            Alert.alert(
              'Quitter l\'entretien',
              'Êtes-vous sûr de vouloir quitter ? Votre progression sera perdue.',
              [
                { text: 'Non', style: 'cancel' },
                { text: 'Oui', onPress: handleGoBack }
              ]
            );
          }}
        >
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Question 1</Text>
          <Text style={styles.headerSubtitle}>Technical</Text>
        </View>
      </LinearGradient>
      
      <ScrollView style={styles.content}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Tell me about your experience with React Native?</Text>
          <Text style={styles.tipsText}>Conseil: Focus on specific projects and challenges you've overcome.</Text>
        </View>
        
        <View style={styles.cameraContainer}>
          {recording && (
            <View style={styles.recordingOverlay}>
              <Text style={styles.recordingTime}>{formatTime(recordingTime)}</Text>
              <View style={styles.recordingIndicator} />
            </View>
          )}
          
          {/* Camera error display */}
          {cameraError ? (
            <View style={[styles.camera, {justifyContent: 'center', alignItems: 'center', backgroundColor: '#444'}]}>
              <Icon name="camera-off" size={48} color="#FFF" />
              <Text style={{color: '#FFF', textAlign: 'center', margin: spacing.md}}>
                Camera error: {cameraError}
              </Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={() => {
                  setCameraError(null);
                }}
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : !device ? (
            <View style={[styles.camera, {justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'}]}>
              <ActivityIndicator size="large" color="#FFF" />
              <Text style={{color: '#FFF', marginTop: spacing.sm}}>
                Initializing camera...
              </Text>
            </View>
          ) : (
            <>
              <Camera
                ref={cameraRef}
                style={styles.camera}
                device={device}
                isActive={true}
                video={true}
                audio={true}
                onError={onCameraError}
              />
              <TouchableOpacity 
                style={styles.flipCameraButton}
                onPress={toggleCamera}
                disabled={recording}
              >
                <Icon name="camera-switch" size={24} color="#FFF" />
              </TouchableOpacity>
              <View style={styles.cameraTypeIndicator}>
                <Text style={styles.cameraTypeText}>
                  {preferredCameraPosition === 'front' ? 'Selfie' : 'Back'} Camera
                </Text>
              </View>
            </>
          )}
        </View>
        
        <View style={styles.controlsContainer}>
          {recording ? (
            <TouchableOpacity
              style={[styles.controlButton, styles.stopButton]}
              onPress={stopRecording}
            >
              <Icon name="stop" size={36} color="#FFF" />
              <Text style={styles.controlButtonText}>Arrêter</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.controlButton, styles.recordButton]}
              onPress={startRecording}
              disabled={!device || !!cameraError}
            >
              <Icon name="record" size={36} color="#FFF" />
              <Text style={styles.controlButtonText}>Enregistrer</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  headerContent: {
    marginTop: spacing.md,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: fontSize.md,
    color: '#FFF',
    opacity: 0.8,
  },
  backButton: {
    position: 'absolute',
    top: spacing.lg + spacing.sm,
    left: spacing.md,
    zIndex: 10,
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  startTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginTop: spacing.lg,
  },
  startDescription: {
    fontSize: fontSize.md,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  infoContainer: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: fontSize.md,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  startButton: {
    backgroundColor: colors.graduate,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  questionContainer: {
    backgroundColor: '#FFF',
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionText: {
    fontSize: fontSize.lg,
    color: colors.text,
    fontWeight: fontWeight.semibold,
  },
  tipsText: {
    fontSize: fontSize.sm,
    color: colors.graduate,
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
  cameraContainer: {
    height: 300,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  camera: {
    flex: 1,
  },
  recordingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: spacing.sm,
  },
  recordingTime: {
    color: '#FFF',
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  recordingIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'red',
    marginLeft: spacing.sm,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  controlButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  recordButton: {
    backgroundColor: colors.graduate,
  },
  stopButton: {
    backgroundColor: '#FF3B30',
  },
  controlButtonText: {
    color: '#FFF',
    marginTop: spacing.xs,
    fontSize: fontSize.sm,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  permissionText: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    textAlign: 'center',
  },
  permissionButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.graduate,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#FFF',
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  retryButton: {
    backgroundColor: colors.graduate,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    marginTop: spacing.md,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  flipCameraButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: spacing.sm,
    borderRadius: 30,
    zIndex: 10,
  },
  cameraTypeIndicator: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 20,
    zIndex: 10,
  },
  cameraTypeText: {
    color: '#FFF',
    fontSize: fontSize.sm,
  },
});

export default VirtualInterviewScreen; 