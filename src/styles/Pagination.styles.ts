import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  paginationButton: {
    padding: 8,
    backgroundColor: '#D32F2F',
    borderRadius: 5,
    minWidth: 40,
    alignItems: 'center',
    marginHorizontal: 4
  },
  paginationButtonDisabled: {
    backgroundColor: '#ccc'
  },
  paginationButtonText: {
    color: '#fff',
    fontSize: 18
  },
  paginationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8
  }
});
