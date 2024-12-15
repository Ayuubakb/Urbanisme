package GeographyService.GeographyService.DTOs;


import GeographyService.GeographyService.Model.Ville;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ZoneDTO {
    private int id_zone;
    private String nom_zone;
    private String nom_ville;

    public ZoneDTO(int id_zone, String nom_zone) {
        this.id_zone = id_zone;
        this.nom_zone = nom_zone;
    }
}
