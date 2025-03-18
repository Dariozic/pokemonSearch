import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/Pagination.styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onFirstPage: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage
}) => {
  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[
          styles.paginationButton,
          currentPage === 0 && styles.paginationButtonDisabled
        ]}
        onPress={onFirstPage}
        disabled={currentPage === 0}
      >
        <Text style={styles.paginationButtonText}>⏮️</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.paginationButton,
          currentPage === 0 && styles.paginationButtonDisabled
        ]}
        onPress={onPreviousPage}
        disabled={currentPage === 0}
      >
        <Text style={styles.paginationButtonText}>⬅️</Text>
      </TouchableOpacity>

      <Text style={styles.paginationText}>
        {currentPage + 1} / {totalPages}
      </Text>

      <TouchableOpacity
        style={[
          styles.paginationButton,
          currentPage === totalPages - 1 && styles.paginationButtonDisabled
        ]}
        onPress={onNextPage}
        disabled={currentPage === totalPages - 1}
      >
        <Text style={styles.paginationButtonText}>➡️</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.paginationButton,
          currentPage === totalPages - 1 && styles.paginationButtonDisabled
        ]}
        onPress={onLastPage}
        disabled={currentPage === totalPages - 1}
      >
        <Text style={styles.paginationButtonText}>⏭️</Text>
      </TouchableOpacity>
    </View>
  );
};
