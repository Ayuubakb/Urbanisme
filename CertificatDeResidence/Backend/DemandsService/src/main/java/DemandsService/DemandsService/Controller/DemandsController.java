package DemandsService.DemandsService.Controller;

import DemandsService.DemandsService.DTOs.DemandeDTO;
import DemandsService.DemandsService.DTOs.StatusDTO;
import DemandsService.DemandsService.DTOs.SuivieDTO;
import DemandsService.DemandsService.Enums.Status;
import DemandsService.DemandsService.Models.Demandes;
import DemandsService.DemandsService.Services.DemandsServices;
import jakarta.ws.rs.PUT;
import org.apache.hc.core5.util.Deadline;
import org.aspectj.lang.annotation.RequiredTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/demands")
public class DemandsController {

    @Autowired
    DemandsServices demandsServices;

    @GetMapping("/get/all")
    public ResponseEntity<List<DemandeDTO>> getAllDemandes() {
        List<DemandeDTO> demandes = demandsServices.FindAllDemandes();
        if(demandes == null)
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(demandes, HttpStatus.OK);
    }

    @GetMapping("/get_id/{id}")
    public ResponseEntity<DemandeDTO> getDemandeById(@PathVariable("id") int id) {
        DemandeDTO demande = demandsServices.FindDemandeById(id);
        if(demande == null)
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        if(demande.getNom_emetteur() == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(demande, HttpStatus.OK);
    }

    @GetMapping("/get_zone/{id}")
    public ResponseEntity<List<DemandeDTO>> getDemandeByZone(@PathVariable("id") int id) {
        List<DemandeDTO> demandeDTOS = demandsServices.FindDemandesByZone(id);
        if(demandeDTOS == null)
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(demandeDTOS, HttpStatus.OK);
    }

    @PutMapping("/update_status/{id}")
    public ResponseEntity<Boolean> updateDemandeStatus(@PathVariable("id") int id, @RequestBody StatusDTO status) {
        Boolean isUpdated=demandsServices.updateDemandStatus(status.getStatus(),id);
        return new ResponseEntity<>(isUpdated, HttpStatus.OK);
    }

    @PostMapping(path = "/addFiles/{isMilitary}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Integer> addDemandeFiles(@PathVariable Boolean isMilitary,
                                              @RequestPart MultipartFile facture_electricite,
                                              @RequestPart MultipartFile certif_priorite,
                                              @RequestPart MultipartFile document_emploie,
                                              @RequestPart(required = false) MultipartFile certif_presence) throws IOException {
           int id_file=demandsServices.addDemandFiles(isMilitary,facture_electricite,certif_priorite,document_emploie,certif_presence);
           if(id_file == -1 || id_file == 0)
               return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
           return new ResponseEntity<>(id_file, HttpStatus.OK);
    }

    @PostMapping("/add/{id_files}")
    public ResponseEntity<String> addDemand(@RequestBody Demandes demand,@PathVariable int id_files) {
        int id_demande= demandsServices.addDemand(demand,id_files);
        if(id_demande == 0)
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        String code="Z-"+demand.getId_zone()+"-D-"+id_demande;
        return new ResponseEntity<>(code, HttpStatus.CREATED);
    }

    @GetMapping("/getStatus/{id}")
    public ResponseEntity<SuivieDTO> getStatus(@PathVariable int id){
        SuivieDTO suivieDTO=demandsServices.getDemandStatus(id);
        if(suivieDTO == null)
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        if(suivieDTO.getStatus() == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(suivieDTO, HttpStatus.OK);
    }
}
