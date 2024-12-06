package com.ClientSpace.Controllers;

import com.ClientSpace.DTOs.DemandeDTO;
import com.ClientSpace.DTOs.DocumentDTO;
import com.ClientSpace.DTOs.FormulaireDTO;
import com.ClientSpace.DTOs.userDto;
import com.ClientSpace.Models.demande;
import com.ClientSpace.Models.formulaire;
import com.ClientSpace.Models.user;
import com.ClientSpace.Repositories.demande_repo;
import com.ClientSpace.Repositories.formulaire_repo;
import com.ClientSpace.Repositories.user_repo;
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
    public ResponseEntity<userDto> getProfile(@RequestBody Float id) {
        user user = user_repo.findById(id).isPresent() ? user_repo.findById(id).get() : null;
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userDto.builder().nom(user.getNom()).prenom(user.getPrenom()).build());
    }

    @PostMapping("/add_demande/{id}")
    public ResponseEntity<String> addDemande(@PathVariable Float id, @RequestBody boolean is_procure) {
        user user = user_repo.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        demande demande = new demande();
        demande.setId_user(id);
        demande.set_procureur(is_procure);
        demande savedDemande = demande_repo.save(demande);

        return ResponseEntity.ok("Demand ID: " + savedDemande.getId());
    }

    @PostMapping ("/add_formulaire")
    public ResponseEntity<String> addFormulaire(@RequestBody FormulaireDTO formulaireDTO){
        formulaire formulaire = new formulaire();
        formulaire.setId_demande(formulaireDTO.getId_demande());
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
      List<demande> demandes = demande_repo.findAllById_user(userId);
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
