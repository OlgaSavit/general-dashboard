import Icon from '../../../components/Icon';
import {stylessheet} from './styles';
import Colors from '../../../constants/theme';
import {useSelector} from 'react-redux';
import Layout from '../../../components/Layout';
import React, {useCallback} from 'react';
import {View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton, {ButtonTypes} from '../../../components/Button';
export const topNavigationTypes = {
  default: 'default',
  photo: 'photo',
  sliderPhoto: 'sliderPhoto',
};
const initialProps = {
  showBack: true,
  showNext: false,
  title: '',
  customLeftBtn: null,
  customRightBtn: null,
  customTitle: null,
  titleCount: null,
  onBackPress: null,
  type: topNavigationTypes.default,
  photo: null,
  sliderPhoto: [],
  onNextPress: () => {},
};
const TopNavigation = props => {
  const navigation = useNavigation();
  const {
    showBack,
    showNext,
    title,
    customTitle,
    customLeftBtn,
    customRightBtn,
    titleCount,
    onBackPress,
    onNextPress,
    type,
    photo,
    sliderPhoto,
  } = {
    ...initialProps,
    ...props,
  };
  const {theme} = useSelector(store => store.theme);

  const handleBackPress = useCallback(() => {
    if (
      typeof onBackPress !== 'undefined' &&
      typeof onBackPress === 'function'
    ) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  }, [onBackPress]);

  const styles = stylessheet(theme);
  if (type === topNavigationTypes.photo) {
    return (
      <View style={styles.wrapperPhotoBlock}>
        <Image style={styles.photoStyle} source={photo} />
        <Layout
          styleContainer={styles.layoutStyle}
          styleScrollView={styles.styleScrollView}>
          <View style={styles.wrapperPhotoButtonsBlock}>
            <View style={styles.wrapperLeftBlock}>
              {showBack && (
                <CustomButton
                  styleContainer={styles.bgPhotoBtn}
                  onPress={handleBackPress}
                  btnType={ButtonTypes.roundBtn}>
                  <Icon
                    color={Colors[theme].colors.dark_300}
                    size={14}
                    name={'chevron-left'}
                  />
                </CustomButton>
              )}
              {customLeftBtn && customLeftBtn}
            </View>
            <View style={styles.wrapperRightBlock}>
              {customRightBtn && customRightBtn}
            </View>
          </View>
        </Layout>
      </View>
    );
  }
  if (type === topNavigationTypes.sliderPhoto) {
    return (
      <View style={styles.wrapperPhotoBlock}>
        <Layout
          styleContainer={styles.layoutStyle}
          styleScrollView={styles.styleScrollView}>
          <View style={styles.wrapperPhotoButtonsBlock}>
            <View style={styles.wrapperLeftBlock}>
              {showBack && (
                <CustomButton
                  styleContainer={styles.bgPhotoBtn}
                  onPress={handleBackPress}
                  btnType={ButtonTypes.roundBtn}>
                  <Icon
                    color={Colors[theme].colors.dark_300}
                    size={14}
                    name={'chevron-left'}
                  />
                </CustomButton>
              )}
              {customLeftBtn && customLeftBtn}
            </View>
            <View style={styles.wrapperRightBlock}>
              {customRightBtn && customRightBtn}
            </View>
          </View>
        </Layout>
      </View>
    );
  }
  return (
    <View style={styles.wrapperTopNavigation}>
      <View style={styles.wrapperLeftBlock}>
        {showBack && (
          <CustomButton
            onPress={handleBackPress}
            btnType={ButtonTypes.roundBtn}>
            <Icon
              color={Colors[theme].colors.dark_300}
              size={14}
              name={'chevron-left'}
            />
          </CustomButton>
        )}
        {customLeftBtn && customLeftBtn}
      </View>
      {customTitle ? (
        customTitle
      ) : (
        <View style={styles.wrapperCenterBlock}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          {titleCount && (
            <View style={styles.counterWrapper}>
              <Text numberOfLines={1} style={styles.countText}>
                {titleCount}
              </Text>
            </View>
          )}
        </View>
      )}
      <View style={styles.wrapperRightBlock}>
        {showNext && (
          <CustomButton onPress={onNextPress} btnType={ButtonTypes.roundBtn}>
            <Icon
              color={Colors[theme].colors.dark_300}
              size={14}
              name={'chevron-right'}
            />
          </CustomButton>
        )}
        {customRightBtn && customRightBtn}
      </View>
    </View>
  );
};
export default TopNavigation;
