import { CameraView, useCameraPermissions } from 'expo-camera';
import { Camera as LucideCamera, X } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface WebCameraOverlayProps {
    isVisible: boolean;
    onClose: () => void;
    onCapture: (uri: string) => void;
}

export const WebCameraOverlay = ({ isVisible, onClose, onCapture }: WebCameraOverlayProps) => {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<any>(null);
    const [isCameraReady, setIsCameraReady] = useState(false);

    if (!isVisible) return null;

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <Modal visible={isVisible} transparent={true} animationType="fade">
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.text}>We need your permission to show the camera</Text>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#7C3AED' }]}
                            onPress={() => {
                                console.log('Requesting permission...');
                                requestPermission();
                            }}
                        >
                            <Text style={styles.buttonText}>Grant Permission</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <X size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    const handleCapture = async () => {
        if (cameraRef.current && isCameraReady) {
            try {
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 1,
                    base64: true,
                });
                onCapture(photo.uri);
                onClose();
            } catch (error) {
                console.error('Failed to take picture:', error);
            }
        }
    };

    return (
        <Modal visible={isVisible} transparent={true} animationType="fade">
            <View style={styles.container}>
                <View style={styles.cameraContainer}>
                    <CameraView
                        ref={cameraRef}
                        style={styles.camera}
                        facing="front"
                        onCameraReady={() => setIsCameraReady(true)}
                    >
                        <View style={styles.overlay}>
                            <TouchableOpacity style={styles.closeButtonTop} onPress={onClose}>
                                <X size={28} color="white" />
                            </TouchableOpacity>

                            <View style={styles.controls}>
                                <TouchableOpacity
                                    style={styles.captureButton}
                                    onPress={handleCapture}
                                    disabled={!isCameraReady}
                                >
                                    <View style={styles.captureInner}>
                                        <LucideCamera size={32} color="white" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </CameraView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 20,
        alignItems: 'center',
    },
    cameraContainer: {
        width: Platform.OS === 'web' ? '80%' : '100%',
        height: Platform.OS === 'web' ? '80%' : '100%',
        maxWidth: 600,
        maxHeight: 800,
        borderRadius: 20,
        overflow: 'hidden',
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        padding: 20,
    },
    text: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#7C3AED',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 20,
    },
    closeButtonTop: {
        alignSelf: 'flex-end',
    },
    controls: {
        alignItems: 'center',
        marginBottom: 20,
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'white',
    },
    captureInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#7C3AED',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
