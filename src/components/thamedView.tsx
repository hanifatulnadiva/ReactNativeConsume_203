import{View, type ViewProps} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from '../constants/Colors';

export interface ThamedViewProps extends ViewProps{
    lightColor?:string;
    darkColor?:string;
}
export function Thamed({style, lightColor, darkColor,...otherProps}:ThamedViewProps) {
    const theme= useColorScheme() ?? 'light';
    const backgrounndColor = theme === 'light'
        ?(lightColor ?? Colors.light.background)
        :(darkColor ?? Colors.dark.background);
    return <View style ={[{ backgroundColor: backgrounndColor}, style]} {...otherProps}/>;    

}