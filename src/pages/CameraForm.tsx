import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Switch } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Request } from '../services/Request'; 
import { Dropdown } from 'react-native-element-dropdown';

interface CameraListProps {
    navigation: Navigation;
    route: {
        params: {edit: boolean, id: number};
    }
}

export default function CameraForm({ navigation, route }: CameraListProps) {

    const request = new Request();
    const params = route.params;

    const [plan, setPlan] = useState('');
    const [title, setTitle] = useState('');
    const [external, setExternal] = useState(false);

    const plans = [
        {label: '1 Dia', value: "1dia"},
        {label: '3 Dias', value: "3dias"},
        {label: '7 Dias', value: "7dias"}
    ];

    const toggleSwitch = () => setExternal(previousState => !previousState);

    function goBack(){
        navigation.goBack();
    }

    async function handleNew(){
     
        if (params.edit == false){
            await request.createCamera(title, plan, external);
        }
        if (params.edit == true){ 
            await request.updateCamera(title, plan, external, params.id);
        }


        navigation.navigate("CameraList");

    }
  
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack}>
                    <FontAwesomeIcon style={{marginLeft: 10}}icon={faArrowLeft} color="white" size='2x' />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNew}>
                    <Text style={{marginRight: 10, color: '#fff', fontSize: '20px'}}>Salvar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>

                <View>
                    <View>
                        <Text style={styles.label}>Nome da Câmera</Text>
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            editable
                            style={styles.inputText}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Plano de gravação</Text>

                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={plans}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Selecionar"
                            searchPlaceholder="Search..."
                            value={plan}
                            onChange={e => setPlan(e.value)}
                            
                        />

                
                    </View>
                    <View style={styles.switchInput}>
                        <Text style={styles.label}>Câmera Externa</Text>
                        <Switch
                            trackColor={{false: '#767577', true: '#0071BC'}}
                            thumbColor={external ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onChange={setExternal}
                            onValueChange={toggleSwitch}
                            value={external}
                        />
                    </View>
                </View>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: '60px',
        backgroundColor: '#0071BC',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    content: {
        marginLeft: 20,
        marginRight: 20,
    },
    label: {
        fontWeight: '500', 
        fontSize: '20px',
        marginTop: '10px',
        marginBottom: '10px',
    },
    inputText: {
        paddingLeft: '12px',
        paddingRight: '12px',
        paddingVertical: '10px',
        borderColor: '#000',
        borderWidth: '1px',
        fontSize: '20px',
        borderWidth: 0.5,
        borderRadius: 8,
    },
    switchInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});