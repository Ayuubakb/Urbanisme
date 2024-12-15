package GeographyService.GeographyService.Repositories;

import GeographyService.GeographyService.Model.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RegionRepository extends JpaRepository<Region, Integer> {
    @Query("select R from Region R where R.nom_region=?1")
    Optional<Region> findByName(String name);
}
