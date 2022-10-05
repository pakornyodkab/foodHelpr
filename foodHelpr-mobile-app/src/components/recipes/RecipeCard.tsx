import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function Card(props) {
    const [Tags, setTags] = React.useState<Array<string>>([]);
    React.useEffect(() => {
        setTags(props.tags);
      }, []);

    return (
        <View style={styles.card}>
            <View style={styles.cardContainer} className="flex-row flex-grow-0 flex-shrink-0">
                <View className='flex-1 justify-center'>
                    <Image
                        source={{
                            uri: props.imageUrl,
                          }}
                        style={{ width: 100, height: 100}}
                    />
                </View>
                <View className='w-full left-20 flex-col flex-1'>
                    <Text className="text-green-500 font-bold text-lg right-2">{props.title}</Text>
                    {Tags.map((tag,index) => {
                        if(index<2) return <Text className='right-2'>{tag}</Text>
                        else if(index==2 && Tags.length>3) return <Text className='right-2'>{tag} ...</Text>
                        else if(index==2) return <Text className='right-2'>{tag}</Text>
                    })}
                </View>
                <View className='w-full flex-col flex-1 justify-end'>
                    <Text className="text-green-500 self-end font-semibold text-2xl">{props.kcal}</Text>
                    <Text className='self-end font-semibold'> KCal</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        elevation: 5,
        borderColor: '#2CBB54',
        backgroundColor: '#fff',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardContainer: {
        marginHorizontal: 10,
        marginVertical: 10,
    }
});