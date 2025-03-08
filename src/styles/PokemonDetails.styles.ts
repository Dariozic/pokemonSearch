import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    width: '100%'
  },
  backgroundImageStyle: {
    opacity: 0.2,
    resizeMode: 'repeat'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  backButton: {
    marginRight: 10,
    padding: 5
  },
  backButtonText: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold'
  },
  pokemonName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    flex: 1
  },
  pokemonId: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  navigationArrows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8
  },
  navArrow: {
    padding: 8
  },
  navArrowText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  },
  navSpacer: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  pokemonImage: {
    width: 200,
    height: 200
  },
  detailsCard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    minHeight: '100%'
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  typeTag: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 5
  },
  typeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  statItem: {
    flex: 1,
    alignItems: 'center'
  },
  statIconContainer: {
    marginBottom: 5
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  statLabel: {
    fontSize: 12,
    color: '#666'
  },
  divider: {
    width: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 10
  },
  movesContainer: {
    alignItems: 'center'
  },
  moveText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30
  },
  baseStatsContainer: {
    marginTop: 5
  },
  baseStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  baseStatName: {
    width: 40,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5
  },
  baseStatValue: {
    width: 30,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10
  },
  baseStatBarContainer: {
    flex: 1,
    height: 5,
    backgroundColor: '#eee',
    borderRadius: 3,
    overflow: 'hidden'
  },
  baseStatBar: {
    height: '100%'
  }
});
