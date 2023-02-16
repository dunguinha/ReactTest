import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil, faPlusCircle, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Request } from '../services/Request'; 
import React, {useEffect, useState} from 'react';


interface CameraListProps {
    navigation: Navigation;
}

export default function CameraList({ navigation }: CameraListProps) {

    const request = new Request();
    const [camera, setCamera] = useState<Camera>();

    async function listingCameras(){
        const body = await request.listingCameras();
        setCamera(body);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            listingCameras();
        });
        return unsubscribe;
    },[navigation]);


  

    async function handleRemove(id: number){
        await request.deleteCamera(id);

        listingCameras();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("CameraForm", {edit:false, id: 0})}>
                    <FontAwesomeIcon style={{marginRight: 10}}icon={faPlusCircle} color="white" size='2x' />
                </TouchableOpacity>
            </View>


            <FlatList
                contentContainerStyle={styles.flatList}
                data={Object(camera)}
                renderItem={({item}) => 
                    <View style={styles.flatListContent}>
                    
                        <View style={styles.imageView}>
                            <TouchableOpacity style={styles.videoPlay}>
                                <FontAwesomeIcon icon={faPlay} color="white" size='3x' />
                            </TouchableOpacity>
                            <Image style={styles.imageContent} source={{uri:item.image_url}}/>
                        </View>

                        <View style={styles.titleView}>
                            <TouchableOpacity onPress={() => navigation.navigate("CameraForm", {edit:true, id:item.id})}>
                                <FontAwesomeIcon style={styles.smallIcons} icon={faPencil} color="orange" size='1x' />
                            </TouchableOpacity>
                            <Text style={styles.titleText}>{item.title}</Text>
                            <TouchableOpacity onPress={() => handleRemove(item.id)}>
                                <FontAwesomeIcon style={styles.smallIcons} icon={faTrashCan} color="red" size='1x'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    

                }
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        height: '60px',
        backgroundColor: '#0071BC',
        justifyContent: 'center',
        alignItems: 'end',
    },
    flatList: {
        flex: 1,
        alignItems: 'center',
    },
    flatListContent: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 30,
        borderColor: '#FFFFFF',
        border: '1px solid',
        width: '90vw',
        marginTop: 10,
        marginBottom: 10,
    },
    imageView: {
        width: '100%',
    },
    imageContent: {
        height: 200,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        resizeMode: 'stretch',
        backgroundColor: "#fff",
    },
    videoPlay: {
        width: '100%',
        height: 200,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        backgroundColor: "rgba(0, 0, 0, 0.20)",
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '10',

    },
    titleView: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        paddingVertical: '8px',
    },
    titleText: {
    },
    smallIcons: {
    },
});
