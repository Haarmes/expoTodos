import { View, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function Add({ add }) {
    const [name, setName] = useState('')

    const save = () => {
        add(name)
        setName('')
    }

    return (
        <View>
            <TextInput style={styles.form} value={name} onChangeText={text => setName(text)} placeholder="task name..." />
            <Button title='Save' onPress={() => save(name)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    form: {

    }
});