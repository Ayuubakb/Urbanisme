package DemandsService.DemandsService.Models;

import DemandsService.DemandsService.Enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.File;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "demandes")
public class Demandes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
    private Date date_demande;
    @OneToOne
    @JoinColumn(name = "file_id")
    private Files file;
    private String motif_refus;

    public Demandes(int id_zone,String nom_emetteur,String prenom_emetteur, String address, String cin, String telephone, String email, String payment_reference) {
        this.id_zone=id_zone;
        this.nom_emetteur=nom_emetteur;
        this.prenom_emetteur=prenom_emetteur;
        this.address=address;
        this.cin=cin;
        this.telephone=telephone;
        this.email=email;
        this.payment_reference=payment_reference;
    }

}
