package GeographyService.GeographyService.Repositories;

import GeographyService.GeographyService.Model.Region;
import GeographyService.GeographyService.Model.Zone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ZoneRepository extends JpaRepository<Zone, Integer> {
    @Query("select Z from Zone Z where Z.nom_zone=?1")
    Optional<Zone> findByName(String name);

    @Query("select Z from Zone Z where Z.ville.id_ville=?1")
    List<Zone> findByVille(int id);
}
