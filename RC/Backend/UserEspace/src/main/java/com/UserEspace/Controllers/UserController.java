package com.UserEspace.Controllers;

import com.UserEspace.DTOs.DemandeDTO;
import com.UserEspace.DTOs.DocumentDTO;
import com.UserEspace.DTOs.FormulaireDTO;
import com.UserEspace.DTOs.userDto;
import com.UserEspace.Models.demande;
import com.UserEspace.Models.formulaire;
import com.UserEspace.Models.user;
import com.UserEspace.Repositories.demande_repo;
import com.UserEspace.Repositories.formulaire_repo;
import com.UserEspace.Repositories.user_repo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final user_repo user_repo;
    private final demande_repo demande_repo;
    private final formulaire_repo formulaire_repo;

    @GetMapping("/profile")
    public ResponseEntity<userDto> getProfile(@RequestBody Long id) {
        user user = user_repo.findById(Float.valueOf(id)).isPresent() ? user_repo.findById(Float.valueOf(id)).get() : null;
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userDto.builder().nom(user.getNom()).prenom(user.getPrenom()).build());
    }
    @PostMapping("/add_demande/{id}")
    public ResponseEntity<String> addDemande(@PathVariable Long id, @RequestBody boolean is_procure) {
        user user = user_repo.findById(Float.valueOf(id)).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        demande demande = new demande();
        demande.setId_user(id);
        demande.set_procureur(is_procure);
        demande.setStatus("En cours ");
        demande savedDemande = demande_repo.save(demande);

        return ResponseEntity.ok("Demand ID: " + savedDemande.getId());
    }

    @PostMapping ("/add_formulaire")
    public ResponseEntity<String> addFormulaire(@RequestBody FormulaireDTO formulaireDTO){
        formulaire formulaire = new formulaire();
        formulaire.setId_demande((long) formulaireDTO.getId_demande());
        formulaire.setNom(formulaireDTO.getNom());
        formulaire.setPrenom(formulaireDTO.getPrenom());
        formulaire.setCin(formulaireDTO.getCin());
        formulaire.setProcuration(formulaireDTO.getProcuration());
        formulaire.setAdresse(formulaireDTO.getAdresse());
        formulaire.setNr_chronologique(formulaireDTO.getNr_chronologique());
        formulaire.setIce(formulaireDTO.getIce());
        formulaire.setBenificiaire_nom(formulaireDTO.getBenificiaire_nom());
        formulaire.setBenificiaire_prenom(formulaireDTO.getBenificiaire_prenom());
        formulaire.setBenificiaire_cin(formulaireDTO.getBenificiaire_cin());
        formulaire.setObjet_commerce(formulaireDTO.getObjet_commerce());
        formulaire.setDate_creation(formulaireDTO.getDate_creation());
        formulaire.setCapital(formulaireDTO.getCapital());
        formulaire savedFormulaire = formulaire_repo.save(formulaire);
        //update the demande and set the id_formulaire
      demande_repo.findById(savedFormulaire.getId_demande()).get().setId_formulaire(savedFormulaire.getId());
        return ResponseEntity.ok("Formulaire saved with sucess");
    }
    @PostMapping("/add_document")
    public ResponseEntity<String> addDocument(@RequestBody DocumentDTO documentDTO){
        //todo
        return null;
    }

    //get the list of demande by user id
    @GetMapping("/demandes/{id}")
    public ResponseEntity<List<DemandeDTO>> getDemandes(@PathVariable Float id) {
      Long userId = id.longValue();
      List<demande> demandes = demande_repo.findAllByUserId(userId);
      if (demandes.isEmpty()) {
        return ResponseEntity.notFound().build();
      }
      List<DemandeDTO> result = new ArrayList<>(demandes.size());
      for (demande demande : demandes) {
        result.add(new DemandeDTO(demande));
      }
      return ResponseEntity.ok(result);
    }
}
