package DemandsService.DemandsService.DTOs;

import DemandsService.DemandsService.Enums.Status;
import DemandsService.DemandsService.Models.Files;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DemandeDTO {
    private int id_demande;
    @Enumerated(value = EnumType.STRING)
    private Status status;
    private int id_zone;
    private String nom_emetteur;
    private String prenom_emetteur;
    private String address;
    private String cin;
    private String telephone;
    private String email;
    private String payment_reference;
    private FileDTO file;
    private Date date_demande;
    private String motif_refus;
}
