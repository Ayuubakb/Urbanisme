package DocumentsGenerationService.DocumentGenerationService.Repositories;

import DocumentsGenerationService.DocumentGenerationService.Model.Demandes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DemandRepository extends JpaRepository<Demandes, Integer> {
}
