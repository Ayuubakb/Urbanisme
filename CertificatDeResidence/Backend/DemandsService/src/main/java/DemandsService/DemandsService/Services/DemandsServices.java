package DemandsService.DemandsService.Services;

import DemandsService.DemandsService.DTOs.DemandeDTO;
import DemandsService.DemandsService.DTOs.FileDTO;
import DemandsService.DemandsService.DTOs.SuivieDTO;
import DemandsService.DemandsService.Enums.Status;
import DemandsService.DemandsService.Models.Demandes;
import DemandsService.DemandsService.Models.Files;
import DemandsService.DemandsService.Repositories.DemandsRepository;
import DemandsService.DemandsService.Repositories.FilesRepository;
import org.apache.hc.core5.util.Deadline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class DemandsServices {
    @Autowired
    DemandsRepository demandsRepository;
    @Autowired
    FilesServices filesServices;
    @Autowired
    private FilesRepository filesRepository;

    private DemandeDTO generateDemandeDTO(Demandes d) {
        FileDTO fileDTO = new FileDTO(
                d.getFile().getFacture_electricite(),
                d.getFile().getFe_contenttype(),
                d.getFile().getCertif_priorite(),
                d.getFile().getCpr_contenttype(),
                d.getFile().getDocument_emploie(),
                d.getFile().getDe_contenttype(),
                d.getFile().getCertif_presence(),
                d.getFile().getCp_contenttype()
        );
        DemandeDTO dto = new DemandeDTO(
                d.getId_demande(),
                d.getStatus(),
                d.getId_zone(),
                d.getNom_emetteur(),
                d.getPrenom_emetteur(),
                d.getAddress(),
                d.getCin(),
                d.getTelephone(),
                d.getEmail(),
                d.getPayment_reference(),
                fileDTO,
                d.getDate_demande(),
                d.getMotif_refus()
        );
        return dto;
    }

    public List<DemandeDTO> FindAllDemandes(){
        List<Demandes> demandes = demandsRepository.findAll();
        List<DemandeDTO> demandeDTOs = new ArrayList<>();
        try{
            demandes=demandsRepository.findAll();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
        for(Demandes d:demandes)
            demandeDTOs.add(generateDemandeDTO(d));
        return demandeDTOs;
    }

    public DemandeDTO FindDemandeById(int id_demande){
        Optional<Demandes> demande;
        try{
            demande = demandsRepository.findById(id_demande);
        }catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
        if(demande.isPresent())
            return generateDemandeDTO(demande.get());
        return new DemandeDTO();
    }

    public List<DemandeDTO> FindDemandesByZone(int id_zone){
        List<Demandes> demandes;
        List<DemandeDTO> demandesDTO=new ArrayList<>();
        try{
            demandes = demandsRepository.findByZone(id_zone);
        }catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
        for(Demandes d:demandes)
            demandesDTO.add(generateDemandeDTO(d));
        return demandesDTO;
    }

    public Boolean updateDemandStatus(Status status, int id_demande){
        int c;
        try{
            c=demandsRepository.updateStatus(id_demande,status);
        }catch(Exception e){
            System.out.println(e.getMessage());
            return false;
        }
        return c==1;
    }

    public Boolean updateDemandStatusAndMotif(Status status, int id_demande,String motif){
        int c;
        try{
            c=demandsRepository.updateStatusAndMotif(id_demande,status,motif);
        }catch(Exception e){
            System.out.println(e.getMessage());
            return false;
        }
        return c==1;
    }

    public Integer addDemand(Demandes demande, int id_file){
        Demandes savedDemand;
        demande.setFile(new Files(id_file));
        demande.setStatus(Status.Envoyer_au_Caïd);
        demande.setDate_demande(new Date());
        demande.setMotif_refus("");
        try {
            savedDemand = demandsRepository.save(demande);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return 0;
        }
        return savedDemand.getId_demande();
    }
    public Integer addDemandFiles(Boolean isMilitary,
                             MultipartFile facture_electricite,
                             MultipartFile certif_priorite,
                             MultipartFile document_emploie,
                             MultipartFile certif_presence) throws IOException {
            System.out.println("in");
            Files files=filesServices.prepareFiles(isMilitary,facture_electricite,certif_priorite,document_emploie,certif_presence);
            System.out.println("files prepared");
            if(files==null)
                return 0;
            Files savedFiles;
            try {
                savedFiles=filesRepository.save(files);
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return -1;
            }
            System.out.println("file save");
            return savedFiles.getId_file();
    }

    public SuivieDTO getDemandStatus(int id_demande){
        Optional<Demandes> demand;
        try{
            demand=demandsRepository.findById(id_demande);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
        if(demand.isPresent())
            return new SuivieDTO(demand.get().getStatus(),demand.get().getNom_emetteur(),demand.get().getPrenom_emetteur(),demand.get().getMotif_refus() );
        return new SuivieDTO();
    }
}
