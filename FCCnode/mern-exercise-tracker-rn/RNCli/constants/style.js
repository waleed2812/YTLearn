import {StyleSheet} from 'react-native';
import Colors from './Colors';


export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 32,
    color: 'black',
  },
  
  header: {
    backgroundColor: Colors.light,
  },

  headerTxt: {
    color: Colors.darker,
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },

  drawer: {
    backgroundColor: Colors.light,
  },

  drawerItem: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  statsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
  },

  statsTxtContainer: {
    backgroundColor: Colors.dark,
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },

  statsTxt: {
    color: Colors.lighter,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: Colors.font_family,
  },

  search: {
    height: '8%',
    width: '90%',
    borderBottomWidth: 5,
    borderColor: Colors.darker,
    fontSize: 20,
    color: Colors.darker,
  },

  flatlistContainer: {
    width: '100%',
  },

  flatlistItemContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.light,
    marginVertical: 10,
    borderRadius: 10,
  },

  flatlistItem: {
    paddingVertical: 10,
    justifyContent: 'center',
    width: '80%',
  },

  faltlistHeart: {
    width: '20%',
    padding: 10,
    alignItems: 'center',
  },

  flatlistTxt: {
    fontSize: 20,
    color: Colors.darker,
    paddingLeft: 10,
  },
});