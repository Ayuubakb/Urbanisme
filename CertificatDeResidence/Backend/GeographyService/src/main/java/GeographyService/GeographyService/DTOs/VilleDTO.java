package GeographyService.GeographyService.DTOs;

import GeographyService.GeographyService.Model.Ville;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VilleDTO {
    private int id_ville;
    private String nom_ville;
    private String nom_region;
    private List<ZoneDTO> zones;

    public VilleDTO(int id_ville,String nom_ville) {
        this.id_ville = id_ville;
        this.nom_ville = nom_ville;
    }
}

