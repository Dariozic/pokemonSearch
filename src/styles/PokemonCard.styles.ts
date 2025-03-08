import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  cardTouchable: {
    padding: 16,
    alignItems: 'center'
  },
  image: {
    width: 120,
    height: 120
  },
  name: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center'
  },
  typeContainer: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'center'
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 3
  },
  typeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
});
