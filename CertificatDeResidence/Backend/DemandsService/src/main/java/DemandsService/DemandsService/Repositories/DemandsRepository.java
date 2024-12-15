package DemandsService.DemandsService.Repositories;

import DemandsService.DemandsService.Enums.Status;
import DemandsService.DemandsService.Models.Demandes;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DemandsRepository extends JpaRepository<Demandes,Integer> {
    @Transactional
    @Query("SELECT D FROM Demandes D WHERE D.id_zone=?1")
    List<Demandes> findByZone(int id_zone);

    @Transactional
    @Modifying
    @Query("UPDATE Demandes D SET D.status=?2 WHERE D.id_demande=?1")
    Integer updateStatus(int id_demande, Status status);
}
