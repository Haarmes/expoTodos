import { Pressable, Text } from 'react-native'
import React from 'react'


export default function Row({ item, selectedId, select }) {
    const backgroundColor = item.doneState === true ? '#99f7b2' : '#fff'

    const lineAddition = () => {
        //const arrayWithNewLine = 
    }

    return (
        <Pressable onPress={() => {
            item.doneState = !item.doneState;
            select(item.id);
        }
        } style={[{ backgroundColor }, {
            alignItems: 'center',
            justifyContent: 'center',
        }]} >
            <Text style={{
                textDecorationLine: item.doneState ? 'line-through' : 'none',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,

            }}>{item.name}</Text>

        </Pressable >

    )
}