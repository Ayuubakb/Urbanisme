package GeographyService.GeographyService.DTOs;

import GeographyService.GeographyService.Model.Ville;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegionDTO {
    private int id_region;
    private String nom_region;
    private List<VilleDTO> villes;

}
