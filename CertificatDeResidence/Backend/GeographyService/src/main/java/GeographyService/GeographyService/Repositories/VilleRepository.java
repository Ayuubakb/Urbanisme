package GeographyService.GeographyService.Repositories;

import GeographyService.GeographyService.Model.Ville;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface VilleRepository extends JpaRepository<Ville, Integer> {
    @Query("select V from Ville V where V.nom_ville=?1")
    Optional<Ville> findByNom_ville(String nom);

    @Query("select V from Ville V where V.region.id_region=?1")
    List<Ville> findByRegion(int idRegion);
}
