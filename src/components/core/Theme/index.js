
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const PRIMARY_COLOR = '#522D23'
const SECONDARY_COLOR = '#CF2E50'
const PRIMARY_COLOR_FONT = '#6E6E6E'
const PRIMARY_COLOR_LIGHT = '#716B95'
const PRIMARY_COLOR_ULTRALIGHT = '#D5C9EE'
const SECONDARY_COLOR_FONT = SECONDARY_COLOR
const YELLOW_GRAY = '#929837'
const BLUE_LIGHT = '#5971F8'
const COLOR_MED_1 = '#92968C'
const COLOR_MED_2 = '#A2A899'
const DARK_COLOR = '#716b95'
const GRAY_COLOR = '#3A3A3A'
const GRAY_LIGHT2_COLOR = '#92968C'
const GRAY_LIGHT3_COLOR = '#A2A799'
const GRAY_LIGHT4_COLOR = '#9799A0'
const WHITE_COLOR = '#FFFFFF'
const LIGHT_BACKGROUND_COLOR = '#F3EFFF'
const EXAM_COLOR = '#716B95'
const EMERGENCY_COLOR = '#F85965'
const GREENLIGHT_COLOR = '#A8B164'
const LIGHT_GRAY_COLOR = '#DFDBEB'
const INACTIVE_GRAY_COLOR = '#838383'
const GREEN_LIGHT2_COLOR = '#8B8F86'
const GREEN_LIGHT3_COLOR = '#91962D'
const HEADER_COLOR = '#24BA8D'
const ORANGE_COLOR = '#F76B1C'
const ORANGE_GRADIENT = ['#BE443B', '#F76B1C']
const GREEN_WHITE_GRADIENT = ['#24BA8D', '#0AB685', '#FFFFFF']
const PURPLE_GRADIENT = ['#6E34E2', '#6E34E2', '#452089']
const PURPLE_LIGHT = 'rgba(147,130,193,0.5)'
const BACKGROUND_LIGHT = '#F3EFFF'
const BUTTON_AQUIRE = '#7D5ED2'
/* COMPONENTS DEFAULT */
const LIST_LIGHT_BACKGROUND = '#DAD7E5'
const LIST_DARK_BACKGROUND = '#CFCCD9'
const HEALTH_POINTS_LIGHT_PURPLE = '#6852A3'

/* MARKETPLACE SPECIFIC */
const DARK_BUTTON = '#343333';
const GREEN_BUTTON = '#5D9C19';
const LIGHT_DIVIDER = '#F1EEEE';

/* ALERT */
const ALTERT_BG_COLOR = '#8A79BA'

/* BADGER COLOR */
const BADGER_ORANGE = '#FF5C04'
const BADGER_YELLOW = '#FFB600'
/* DIMENSIONS */
const WIDTH = Dimensions.width
const HEIGHT = Dimensions.height

/* TEXT COLORS */
const DARK_TEXT = '#392179'
const SOFT_DARK_TEXT = '#9B9B9B'
const LIGHT_TEXT = '#FFFFFF'

/*  FONT SIZE */
const TEXT_8 = RFValue(8, 580)//Platform.OS === 'ios' ? RFValue(12, 580) : RFValue(13, 580)
const TEXT_10 = RFValue(10, 580)//Platform.OS === 'ios' ? RFValue(12, 580) : RFValue(13, 580)
const TEXT_12 = RFValue(12, 580)//Platform.OS === 'ios' ? RFValue(12, 580) : RFValue(13, 580)
const TEXT_13 = RFValue(13, 580)//Platform.OS === 'ios' ? RFValue(12, 580) : RFValue(13, 580)
const TEXT_14 = RFValue(14, 580) //Platform.OS === 'ios' ? RFValue(14, 580) : RFValue(15, 580)
const TEXT_16 = RFValue(16, 580) //Platform.OS === 'ios' ? RFValue(16, 580) : RFValue(17, 580)
const TEXT_18 = RFValue(18, 580)//Platform.OS === 'ios' ? RFValue(18, 580) : RFValue(19, 580)
//const TEXT_18 = Platform.OS === 'ios' ? RFValue(18) : RFValue(19)
const TEXT_20 = RFValue(20, 580)//Platform.OS === 'ios' ? RFValue(20, 580) : RFValue(21, 580)
const TEXT_24 = RFValue(24, 580)//Platform.OS === 'ios' ? RFValue(24, 580) : RFValue(25, 580)
const TEXT_26 = RFValue(26, 580)//Platform.OS === 'ios' ? RFValue(26, 580) : RFValue(27, 580)
const TEXT_30 = RFValue(30, 580) //Platform.OS === 'ios' ? RFValue(30, 580) : RFValue(31, 580)
const TEXT_35 = RFValue(35, 580) //Platform.OS === 'ios' ? RFValue(30, 580) : RFValue(31, 580)
const TEXT_50 = RFValue(50, 580)// Platform.OS === 'ios' ? RFValue(50, 580) : RFValue(51, 580)


/* ICON SIZE */
const ICON_LITTLE = RFValue(22)
const ICON_MEDIUM = RFValue(25)
const ICON_LARGE = RFValue(40)

/* PADDINGS */
const PADDING_DEFAULT = RFValue(20)
const PADDING_10 = RFValue(10)
const PADDING_15 = RFValue(15)
const PADDING_20 = RFValue(20)
const PADDING_25 = RFValue(25)
const PADDING_30 = RFValue(25)

/* MARGINS */
const MARGIN_10 = RFValue(10)

// Text
const TITLE_COLOR = '#5F5F5F'
const SECTION_TITLE_COLOR = '#3D464F'

// Fonts
const FONT_LIGHT = 'SFProDisplay-Light'
const FONT_MEDIUM = 'SFProDisplay-Medium'
const FONT_BOLD = 'SFProDisplay-Bold'
const FONT_HEAVY = 'SFProDisplay-Heavy'

export default {
    /* COLORS */
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    PRIMARY_COLOR_FONT,
    PRIMARY_COLOR_LIGHT,
    PRIMARY_COLOR_ULTRALIGHT,
    SECONDARY_COLOR_FONT,
    YELLOW_GRAY,
    BLUE_LIGHT,
    COLOR_MED_1,
    COLOR_MED_2,
    DARK_COLOR,
    GRAY_COLOR,
    GRAY_LIGHT2_COLOR,
    GRAY_LIGHT3_COLOR,
    GRAY_LIGHT4_COLOR,
    WHITE_COLOR,
    LIGHT_BACKGROUND_COLOR,
    EXAM_COLOR,
    EMERGENCY_COLOR,
    GREENLIGHT_COLOR,
    LIGHT_GRAY_COLOR,
    INACTIVE_GRAY_COLOR,
    GREEN_LIGHT2_COLOR,
    GREEN_LIGHT3_COLOR,
    HEADER_COLOR,
    ORANGE_COLOR,
    ORANGE_GRADIENT,
    GREEN_WHITE_GRADIENT,
    PURPLE_GRADIENT,
    PURPLE_LIGHT,
    BACKGROUND_LIGHT,
    BUTTON_AQUIRE,
    LIST_LIGHT_BACKGROUND,
    LIST_DARK_BACKGROUND,
    HEALTH_POINTS_LIGHT_PURPLE,
    DARK_BUTTON,
    GREEN_BUTTON,
    LIGHT_DIVIDER,

    ALTERT_BG_COLOR,

    BADGER_ORANGE,
    BADGER_YELLOW,
    WIDTH,
    HEIGHT,

    DARK_TEXT,
    SOFT_DARK_TEXT,
    LIGHT_TEXT,

    TEXT_8,
    TEXT_12,
    TEXT_13,
    TEXT_10,
    TEXT_14,
    TEXT_16,
    TEXT_18,
    TEXT_20,
    TEXT_24,
    TEXT_26,
    TEXT_30,
    TEXT_50,
    ICON_LITTLE,
    ICON_MEDIUM,
    ICON_LARGE,

    PADDING_DEFAULT,
    PADDING_10,
    PADDING_15,
    PADDING_20,
    PADDING_25,
    PADDING_30,

    MARGIN_10,

    TITLE_COLOR,
    SECTION_TITLE_COLOR,

    FONT_LIGHT,
    FONT_MEDIUM,
    FONT_BOLD,
    FONT_HEAVY,
};


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        //   color: '#ffffff',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: TEXT_14,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    wrapperPopup: {
        backgroundColor: LIGHT_BACKGROUND_COLOR,
        width: '90%',
        borderRadius: 10,
        borderColor: PRIMARY_COLOR,
        borderWidth: 2,
        paddingBottom: 20,
        position: 'relative',
    },
    bodyPopup: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    logo: {
        alignItems: 'center',
        width: '80%',
        // Without height undefined it won't work
        height: undefined,
        // figure out your image aspect ratio
        aspectRatio: 150 / 100,
    },
    centerGrid: {
        //height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        //padding: -10
    },
    leftGrid: {
        flex: 1,
        justifyContent: 'center',
        // marginTop: 10
    },
    modalHeaderLight: {
        padding: 18,
        // textTransform: 'capitalize',
        textAlign: 'center',
        borderBottomColor: PRIMARY_COLOR,
        borderBottomWidth: 1,
        fontSize: TEXT_20,
        color: PRIMARY_COLOR
    },
    accordionHeader: {
        padding: 5,
        textTransform: 'capitalize',
        textAlign: 'center',
        fontSize: TEXT_20,
        color: PRIMARY_COLOR,
        borderBottomColor: GRAY_LIGHT2_COLOR,
        borderBottomWidth: 0
    },
    bottonNew: {
        borderRadius: 10
    },
    textHeader: {
        padding: 18,
        textTransform: 'capitalize',
        textAlign: 'center',
        borderBottomColor: PRIMARY_COLOR,
        //borderBottomWidth: 1,
        fontSize: TEXT_20,
        color: PRIMARY_COLOR
    },
    buttonDefault: {
        // marginTop: 50,
        borderRadius: 50,
        height: 50,
        color: WHITE_COLOR,
        backgroundColor: PRIMARY_COLOR_FONT
    },
    buttonConfirm: {
        //marginTop: 50,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 50,
        color: WHITE_COLOR,
        height: 50,
        marginLeft: '15%',
        marginRight: '15%',
    },
    textEmpty: {
        marginTop: 20,
        color: DARK_COLOR,
        fontSize: TEXT_24,
    },
    textDefault: {
        color: PRIMARY_COLOR
    },
    buttonCancel: {
        // marginTop: 50,
        backgroundColor: SECONDARY_COLOR_FONT,
        borderRadius: 50,
        height: 50,
        marginLeft: '15%',
        marginRight: '15%',
    },
    buttonDisable: {
        borderRadius: 50,
        height: 50,
        //  marginTop: 50,
        marginLeft: '15%',
        marginRight: '15%',
    },
    itemForm: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5
    },

    imageProfile: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 45,
    },
    viewTitleMarketplace: {
        margin: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
    },

});

