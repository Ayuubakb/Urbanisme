package DemandsService.DemandsService.DTOs;

import DemandsService.DemandsService.Enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SuivieDTO {
    private Status status;
    private String nom;
    private String prenom;
    private String motifRefus;
}
