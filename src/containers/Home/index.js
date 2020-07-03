import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
// import {Item, Input, Button} from 'native-base';
import MenuIcon from 'react-native-vector-icons/Feather';
import SearchIcon from 'react-native-vector-icons/EvilIcons';
import FilterIcon from 'react-native-vector-icons/AntDesign';

import BagIcon from 'react-native-vector-icons/Fontisto';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import {Colors} from '../../constant/Style';
import {Components} from '../../components';
import Tabs from '../../navigations/tabs';
import {Input, Block, Button, Radio} from 'galio-framework';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Calendar} from 'react-native-calendars';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Moment from 'moment';
const {width} = Dimensions.get('screen');
const {BLACK, WHITECOLOR, ORANGECOLOR} = Colors;
const {ZillaSlab} = Fonts;
import {Fonts} from '../../constant/Style';
import FloatingActionButton from 'react-native-floating-action-button';
const leftIcon = navigation => {
  return (
    <TouchableOpacity
      style={{
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      // onPress={() => navigation.goBack()}
    >
      <MenuIcon name="align-left" size={30} color={BLACK} />
    </TouchableOpacity>
  );
};

const rightIcon = props => {
  return (
    <TouchableOpacity
      style={{
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      // onPress={() => props.navigation.goBack()}
    >
      <FilterIcon name="filter" size={30} color={BLACK} />
    </TouchableOpacity>
  );
};

export default class Home extends React.Component {
  state = {
    images: [
      'https://cdn2.howtostartanllc.com/images/business-ideas/business-idea-images/Pharmacy.jpg',
      'data:image/jpeg;base64,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',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTnGog7OGpv2StulhkqGfB_y4q62PTc0vvTEA&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQbejA3A_hbWY26OT4Cs5CqRHWvtKsJKX-E7g&usqp=CAU',
      // Network image
    ],
    isModalVisible: false,
    isDatePickerVisible: false,
    isTimePickerVisible: false,
    Date: '',
    age: '',
    weight: '',
    calories: '',
    heartrate: '',
    BloodPre: '',
    description: '',
    gender: '',
    gend: [{label: 'Male ', value: 0}, {label: 'Female ', value: 1}],
    value: 0,
  };
  handleConfirm = date => {
    // console.warn('A date has been picked: ', date);
    Moment.locale('en');
    var dt = date;
    var dateTime = Moment(dt).format('MMM d, YYYY H:mma');
    this.setState({
      Date: dateTime,
    });
    this.hideDatePicker();
  };

  hideDatePicker = () => {
    this.setState({
      isDatePickerVisible: false,
      isTimePickerVisible: false,
    });
  };
  showDatePicker = () => {
    this.setState({
      isDatePickerVisible: true,
    });
  };
  render() {
    // console.warn('A date has been picked: ', this.state.Date);
    let {age, weight, calories, heartrate, BloodPre, description} = this.state;
    const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
    const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key: 'workout', color: 'green'};

    return (
      <View style={{flex: 1}}>
        <Components.Header leftIcon={leftIcon()} rightIcon={rightIcon()} />
        {/* <View
            style={{
              height: hp('13%'),
              justifyContent: 'center',
              backgroundColor: '#FAFAFC',
            }}>
            <Item
              regular
              style={{
                width: wp('85%'),
                alignSelf: 'center',
                alignItems: 'center',
                backgroundColor: WHITECOLOR,
                height: hp('6%'),
              }}>
              <SearchIcon name="search" size={30} color={BLACK} />
              <Input placeholder="Underline Textbox" />
              <FilterIcon name="filter" size={30} color={BLACK} />
            </Item>
          </View> */}
        <ScrollView>
          <View
            style={{
              // backgroundColor: 'red',
              height: hp('27%'),
              // justifyContent: 'center',
            }}>
            <View style={{marginTop: hp('2%')}}>
              <SliderBox
                images={this.state.images}
                autoplay={true}
                circleLoop={true}
                dotColor={'transparent'}
                inactiveDotColor={'transparent'}
                sliderBoxHeight={140}
              />
            </View>
          </View>
          <View>
            <Calendar
              style={{
                // borderWidth: 1,
                borderColor: 'gray',
                height: hp('50%'),
                // backgroundColor:  'red'
              }}
              // Specify theme properties to override specific styles for calendar parts. Default = {}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: 'black',
                textSectionTitleDisabledColor: 'black',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: ORANGECOLOR,
                textDisabledColor: '#d9e1e8',
                dotColor: 'black',
                selectedDotColor: 'black',
                arrowColor: ORANGECOLOR,
                disabledArrowColor: '#d9e1e8',
                monthTextColor: ORANGECOLOR,
                indicatorColor: 'blue',
                textDayFontFamily: 'monospace',
                textMonthFontFamily: 'monospace',
                textDayHeaderFontFamily: 'monospace',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 20,
                textMonthFontSize: 20,
                textDayHeaderFontSize: 16,
                selectedDayBackgroundColor: 'blue',
              }}
              // Collection of dates that have to be marked. Default = {}
              markedDates={{
                '2012-05-16': {
                  selected: false,
                  marked: true,
                  selectedColor: 'blue',
                },
                '2012-05-17': {marked: true},
                '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
                '2012-05-19': {disabled: true, disableTouchEvent: true},
              }}
              onDayPress={day => {
                console.log('selected day', day);
              }}
              markingType={'multi-dot'}
            />

            {/* <Calendar
              // Date marking style [simple/period/multi-dot/single]. Default = 'simple'
              markingType={'custom'}
              markedDates={{
                '2018-03-28': {
                  customStyles: {
                    container: {
                      backgroundColor: 'green',
                    },
                    text: {
                      color: 'black',
                      fontWeight: 'bold',
                    },
                  },
                },
                '2018-03-29': {
                  customStyles: {
                    container: {
                      backgroundColor: 'white',
                      elevation: 2,
                    },
                    text: {
                      color: 'blue',
                    },
                  },
                },
              }}
            />

            <Calendar
              markedDates={{
                '2017-10-25': {
                  dots: [vacation, massage, workout],
                  selected: true,
                  selectedColor: 'red',
                },
                '2017-10-26': {dots: [massage, workout], disabled: true},
              }}
              markingType={'multi-dot'}
              onDayPress={(day) => {console.warn('selected day', day)}}
              
            />
            <Calendar
              markedDates={{
                '2017-12-14': {
                  periods: [
                    {startingDay: false, endingDay: true, color: '#5f9ea0'},
                    {startingDay: false, endingDay: true, color: '#ffa500'},
                    {startingDay: true, endingDay: false, color: '#f0e68c'},
                  ],
                },
                '2017-12-15': {
                  periods: [
                    {startingDay: true, endingDay: false, color: '#ffa500'},
                    {color: 'transparent'},
                    {startingDay: false, endingDay: false, color: '#f0e68c'},
                  ],
                },
              }}
              // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
              markingType="multi-period"
            /> */}
          </View>
          {/* <Tabs /> */}
        </ScrollView>

        <View>
          <Modal isVisible={this.state.isModalVisible}>
            <View style={{flex: 1, padding: 15, backgroundColor: 'white'}}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    isModalVisible: !this.state.isModalVisible,
                  })
                }>
                <Image
                  source={require('../../../assets/icon/close.png')}
                  style={{alignSelf: 'flex-end'}}
                />
              </TouchableOpacity>
              <View>
                <ScrollView>
                  <Input
                    placeholder="Age"
                    color={'black'}
                    style={{borderColor: ORANGECOLOR}}
                    placeholderTextColor={'GRAY'}
                    right
                    icon="user"
                    family="antdesign"
                    iconSize={20}
                    iconColor={ORANGECOLOR}
                    onChangeText={e =>
                      this.setState({
                        age: e,
                      })
                    }
                    value={age}
                  />
                  <Input
                    placeholder="Weight in Kg"
                    color={'black'}
                    style={{borderColor: ORANGECOLOR}}
                    placeholderTextColor={'GRAY'}
                    right
                    icon="user"
                    family="antdesign"
                    iconSize={20}
                    iconColor={ORANGECOLOR}
                    onChangeText={e =>
                      this.setState({
                        weight: e,
                      })
                    }
                    value={weight}
                  />
                  <Input
                    placeholder="Daily Calories"
                    color={'black'}
                    style={{borderColor: ORANGECOLOR}}
                    placeholderTextColor={'GRAY'}
                    right
                    icon="user"
                    family="antdesign"
                    iconSize={20}
                    iconColor={ORANGECOLOR}
                    onChangeText={e =>
                      this.setState({
                        calories: e,
                      })
                    }
                    value={calories}
                  />
                  <Input
                    placeholder="Healt Rate"
                    color={'black'}
                    style={{borderColor: ORANGECOLOR}}
                    placeholderTextColor={'GRAY'}
                    right
                    icon="heart"
                    family="antdesign"
                    iconSize={20}
                    iconColor={ORANGECOLOR}
                    onChangeText={e =>
                      this.setState({
                        heartrate: e,
                      })
                    }
                    value={heartrate}
                  />
                  <Input
                    placeholder="Blood Pressure"
                    color={'black'}
                    style={{borderColor: ORANGECOLOR}}
                    placeholderTextColor={'GRAY'}
                    right
                    icon="heart"
                    family="antdesign"
                    iconSize={20}
                    iconColor={ORANGECOLOR}
                    onChangeText={e =>
                      this.setState({
                        BloodPre: e,
                      })
                    }
                    value={BloodPre}
                  />
                  <Input
                    placeholder="Any Other Description"
                    color={'black'}
                    style={{borderColor: ORANGECOLOR}}
                    placeholderTextColor={'GRAY'}
                    right
                    icon="book"
                    family="antdesign"
                    iconSize={20}
                    iconColor={ORANGECOLOR}
                    onChangeText={e =>
                      this.setState({
                        description: e,
                      })
                    }
                    value={description}
                    row={4}
                  />
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Input
                      placeholder="Pick Your Date / Time"
                      color={'black'}
                      style={{borderColor: ORANGECOLOR, width: '135.5%'}}
                      placeholderTextColor={'GRAY'}
                      right
                      family="antdesign"
                      iconSize={20}
                      iconColor={ORANGECOLOR}
                      value={this.state.Date}
                    />
                    <Button
                      onlyIcon
                      icon="calendar"
                      iconFamily="antdesign"
                      iconSize={30}
                      color="warning"
                      iconColor="#fff"
                      style={{width: 40, height: 40, marginTop: 10}}
                      onPress={this.showDatePicker}>
                      warning
                    </Button>
                  </View>
                  <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="datetime"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      alignSelf: 'center',
                      fontFamily: ZillaSlab[1],
                    }}>
                    Gender
                  </Text>
                  <View
                    style={{
                      alignSelf: 'center',
                      padding: 20,
                    }}>
                    <RadioForm
                      radio_props={this.state.gend}
                      initial={0}
                      formHorizontal={true}
                      labelHorizontal={true}
                      buttonColor={ORANGECOLOR}
                      animation={true}
                      onPress={value => {
                        this.setState({value: value});
                      }}
                    />
                  </View>
                  {/* <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Input
                      placeholder="Pick Your Time"
                      color={'black'}
                      style={{borderColor: 'black', width: '135.5%'}}
                      placeholderTextColor="GRAY"                   right
                      family="antdesign"
                      iconSize={14}
                      iconColor={ORANGECOLOR}
                      // value={this.state.date}
                    />
                    <Button
                      onlyIcon
                      icon="calendar"
                      iconFamily="antdesign"
                      iconSize={30}
                      color="warning"
                      iconColor="#fff"
                      style={{width: 40, height: 40, marginTop: 10}}
                      onPress={() =>
                        this.setState({
                          isTimePickerVisible: true,
                        })
                      }>
                      warning
                    </Button>
                  </View>
                  <DateTimePickerModal
                    isVisible={this.state.isTimePickerVisible}
                    mode="time"
                    onConfirm={this.handleConfirm2}
                    onCancel={this.hideDatePicker}
                  /> */}
                  {/* <Button
                    title="Show Date Picker"
                    onPress={this.showDatePicker}
                  />
                  <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                  />
                  <Button
                    title="Show Date Picker"
                    onPress={this.showDatePicker}
                  />
                  <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    // onConfirm={handleConfirm}
                    // onCancel={hideDatePicker}
                  /> */}
                  {/* <Text>{age}</Text> */}
                  <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                    <Button round size="small" color={ORANGECOLOR}>
                      ADD YOUR DETAILS
                    </Button>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
          <FloatingActionButton
            text="Share"
            iconName="md-add"
            iconType="Ionicons"
            iconColor="white"
            textColor="white"
            shadowColor="purple"
            rippleColor="purple"
            backgroundColor={ORANGECOLOR}
            size={60}
            onPress={() =>
              this.setState({
                isModalVisible: !this.state.isModalVisible,
              })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
});
