import {Platform, StyleSheet, Text, useColorScheme, type TextProps} from 'react-native';
import {Colors} from '../constants/Colors';

export interface ThemedTextProps extends TextProps{
    lightColor?:string;
    darkColor?:string;
    type?:'default'|'tittle'|'defaultSemiBold'|'subtittle'|'link'|'code';
}

export function ThemedText({
    style,
    lightColor,
    darkColor,
    type='default',
    ...rest
}: ThemedTextProps){
    const theme = useColorScheme() ?? 'light';
    const color = theme === 'light'
        ?(lightColor ?? Colors.light.text)
        :(darkColor ?? Colors.dark.text);
    return (
        <Text
            style={[
                {color},
                type ==='default' && styles.default,
                type ==='tittle' && styles.tittle,
                type ==='defaultSemiBold' && styles.defaultSemiBold,
                type ==='subtittle' && styles.subtittle,
                type ==='link' && styles.link,
                type ==='code' && styles.code,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default:{
        fontSize:16,
        lineHeight:24,
    },
    defaultSemiBold:{
        fontSize:16,
        lineHeight:24,
        fontWeight:'600',
    },
    tittle:{
        fontSize:28,
        fontWeight:'bold',
        lineHeight:34,
    },
    subtittle:{
        fontSize:16,
        lineHeight:24,
        fontWeight:'600',
    },
    link:{
        fontSize:16,
        lineHeight:24,
        color:'#0284c7',
    },
    code:{
        fontSize:14,
        lineHeight:20,
        fontFamily:Platform.OS==='ios'?'Courier':'monospace',
    },
});