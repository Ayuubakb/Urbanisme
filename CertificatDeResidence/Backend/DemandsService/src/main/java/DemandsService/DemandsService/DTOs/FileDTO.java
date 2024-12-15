package DemandsService.DemandsService.DTOs;

import DemandsService.DemandsService.Models.Demandes;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FileDTO {
    @Lob
    private byte[] facture_electricite;
    private String fe_contenttype;
    @Lob
    private byte[] certif_priorite;
    private String cpr_contenttype;
    @Lob
    private byte[] document_emploie;
    private String de_contenttype;
    @Lob
    private byte[] certif_presence;
    private String cp_contenttype;
}
