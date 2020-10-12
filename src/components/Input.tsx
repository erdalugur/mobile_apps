import React from 'react'
import { TextInput, TextInputProps, StyleSheet, Platform, View, Picker, TouchableOpacity } from 'react-native'
import theme from 'theme';
import InputMasked, { MaskedInputProps } from 'react-text-mask'
import { EyeOff, EyeOn } from 'icons';
import { daysInMonth, withZero } from 'utils';

interface Props extends TextInputProps {

}
export class Input extends React.PureComponent<Props, any> {
    static defaultProps = {
        underlineColorAndroid: undefined
    }
    render() {
        return (
            <TextInput
                {...this.props}
                style={[styles.container, this.props.style]}
                placeholderTextColor={styles.placeholder.color}
            />
        )
    }
}

interface MaskedProps extends MaskedInputProps {
    value: string
}

export class MaskedInput extends React.PureComponent<MaskedProps, any>{
    render() {
        let styles = Object.assign({}, {
            background: 'none',
            border: 'none',
            height: 45,
            color: 'rgb(229, 229, 231)',
            paddingLeft: 10,
            paddingRight: 10
        }, this.props.style)

        return (
            <InputMasked
                {...this.props}
                style={{ ...styles }}
                value={this.props.value}
                onChange={this.props.onChange}
            />
        )
    }
}

export class PhoneInput extends React.PureComponent<MaskedProps, any>{

    onChange = (value: string) => {
        let callback = this.props.onChange as any
        callback({ target: { value } })
    }
    render() {
        if (Platform.OS === 'web') {
            return (
                <MaskedInput
                    {...this.props}
                    placeholder="0(5xx) xxx xxxx"
                    mask={['0', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                />
            )
        } else {
            return (
                <Input

                    placeholder="0(5xx) xxx xxxx"
                    onChangeText={value => this.onChange(value)}
                />
            )
        }
    }
}

interface DateInputProps {
    value: string
    onChange: (value: string) => void
    minYear?: number
    maxYear?: number
}

interface DateInputState {
    year: string
    day: string
    month: string
    yearOptons: string[],
    monthOptions: string[],
    dayOptions: string[]

}
export class DateInput extends React.PureComponent<DateInputProps, DateInputState>{
    static DefaultProps = {
        minYear: 100,
        maxYear: 100
    }
    constructor(props: DateInputProps) {
        super(props);
        let date = new Date()
        this.state = {
            year: date.getFullYear().toString(),
            day: "01",
            month: withZero(date.getMonth()),
            yearOptons: this.getYearRange(),
            dayOptions: this.getDayRange(date.getFullYear().toString(), date.getMonth().toString()),
            monthOptions: this.getMonthRange()
        }
    }
    getYearRange = () => {
        let date = new Date()
        let maxYear = date.getFullYear() + (this.props.maxYear || 100)
        let minYear = date.getFullYear() - (this.props.minYear !== undefined ? this.props.minYear : 100)
        let range: string[] = []
        for (let index = minYear; index < maxYear; index++) {
            range.push(withZero(index))
        }
        return range
    }
    getDayRange = (year: string, month: string) => {
        let maxDay = daysInMonth(parseInt(month), parseInt(year))
        let range: string[] = []
        for (let index = 1; index <= maxDay; index++) {
            range.push(withZero(index))
        }
        return range
    }
    getMonthRange = () => {
        return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    }

    handleChange = (value: any) => {
        let range = this.getDayRange(this.state.year, (value as number).toString());
        this.setState({
            dayOptions: range,
            month: value,
            day: "01"
        })
        this.props.onChange(`${this.state.year}-${value}-01`)
    }

    yearChange = (value: string) => {
        let dayOptions = this.getDayRange(this.state.year, "1");
        this.setState({ year: value, month: "01", dayOptions, day: "01" })
        this.props.onChange(`${value}-01-01`)

    }

    dayChange = (value: string) => {
        this.setState({ day: value })
        this.props.onChange(`${this.state.year}-${this.state.month}-${value}`)
    }
    componentDidMount = () => {
        debugger
        this.props.onChange(`${this.state.year}-${this.state.month}-${this.state.day}`)
    }
    render() {
        const { dayOptions, monthOptions, yearOptons, day, year, month } = this.state
        const dateInputStyle = {
            background: 'none',
            border: 0,
            color: '#e5e5e7',
            width: 'auto',
            padding: 7,
        }
        return (
            <View style={{ flexDirection: 'row', maxWidth: 250 }}>
                <Picker style={[dateInputStyle]} mode="dialog" selectedValue={year} onValueChange={this.yearChange}>
                    {yearOptons.map((x, i) => (
                        <Picker.Item value={x} key={i} label={x} />
                    ))}
                </Picker>
                <Picker style={[dateInputStyle]} selectedValue={month} onValueChange={this.handleChange}>
                    {monthOptions.map((x, i) => (
                        <Picker.Item value={x} key={i} label={x} />
                    ))}
                </Picker>
                <Picker style={[dateInputStyle]} selectedValue={day} onValueChange={this.dayChange}>
                    {dayOptions.map((x, i) => (
                        <Picker.Item value={x} key={i} label={x} />
                    ))}
                </Picker>
            </View>

        )
    }
}

interface TimeInputProps {
    value: string
    onChange: (value: string) => void
}

interface TimeInputState {
    hour: string
    minute: string
}

export class TimeInput extends React.PureComponent<TimeInputProps, TimeInputState>{
    constructor(props: TimeInputProps) {
        super(props);
        let date = new Date()
        this.state = {
            hour: withZero(date.getHours()),
            minute: withZero(date.getMinutes())
        }
    }

    handleChange = (value: string) => {
        this.setState({
            hour: value
        })
        this.props.onChange(`${value}:${this.state.minute}`)
    }

    minuteChange = (value: string) => {
        this.setState({
            minute: value
        })
        this.props.onChange(`${this.state.hour}:${value}`)
    }

    hours = () => {
        return ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
    }

    minutes = () => {
        return ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"]
    }

    componentDidMount = () => {
        debugger
        this.props.onChange(`${this.state.hour}:${this.state.minute}`)
    }
    render() {
        const { minute, hour } = this.state
        const dateInputStyle = {
            background: 'none',
            border: 0,
            color: '#e5e5e7',
            width: 'auto',
            padding: 7,
        }
        return (
            <View style={{ flexDirection: 'row', maxWidth: 250 }}>
                <Picker style={[dateInputStyle]} selectedValue={hour} onValueChange={this.handleChange}>
                    {this.hours().map((x, i) => (
                        <Picker.Item value={x} key={i} label={x} />
                    ))}
                </Picker>
                <Picker style={[dateInputStyle]} selectedValue={minute} onValueChange={this.minuteChange}>
                    {this.minutes().map((x, i) => (
                        <Picker.Item value={x} key={i} label={x} />
                    ))}
                </Picker>
            </View>

        )
    }
}
interface PasswordState {
    visible: boolean
}

export class PasswordInput extends React.PureComponent<Props, PasswordState>{
    state: PasswordState = {
        visible: false
    }
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Input
                    {...this.props}
                    secureTextEntry={!this.state.visible}
                    style={[this.props.style, { width: '100%' }]} />
                <View style={{ width: 40, position: 'absolute', right: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={[]}
                        onPress={() => this.setState((state: PasswordState) => ({ visible: !state.visible }))}>
                        {!this.state.visible ? <EyeOff size={25} /> : <EyeOn size={25} />}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 45,
        color: theme.colors.text,
        paddingHorizontal: 10
    },
    placeholder: { color: "#ddd" },
    maskedInput: {

    },
});