package DocumentsGenerationService.DocumentGenerationService.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "files")
public class Files {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id_file;
    @OneToOne(mappedBy = "file")
    private Demandes demande;
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

    public Files(int id_file){
        this.id_file = id_file;
    }
}
