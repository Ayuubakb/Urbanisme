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
import com.UserEspace.Services.documentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
  private final user_repo user_repo;
  private final demande_repo demande_repo;
  private final formulaire_repo formulaire_repo;
  private final documentService documentService;

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

  @PostMapping("/add_formulaire")
public ResponseEntity<String> addFormulaire(@RequestBody FormulaireDTO formulaireDTO) {
  formulaire formulaire = new formulaire();
  formulaire.setId_demande((long) formulaireDTO.getId_demande());
  formulaire.setNom(formulaireDTO.getNom());
  formulaire.setPrenom(formulaireDTO.getPrenom());
  formulaire.setCin(formulaireDTO.getCin());
  formulaire.setProcuration(formulaireDTO.getProcuration());
  if (!formulaireDTO.getProcuration()) {
    formulaire.setBenificiaire_nom(null);
    formulaire.setBenificiaire_prenom(null);
    formulaire.setBenificiaire_cin(null);
  } else {
    formulaire.setBenificiaire_nom(formulaireDTO.getBenificiaire_nom());
    formulaire.setBenificiaire_prenom(formulaireDTO.getBenificiaire_prenom());
    formulaire.setBenificiaire_cin(formulaireDTO.getBenificiaire_cin());
  }
  formulaire.setAdresse(formulaireDTO.getAdresse());
  formulaire.setNr_chronologique(formulaireDTO.getNr_chronologique());
  formulaire.setIce(formulaireDTO.getIce());
  formulaire.setObjet_commerce(formulaireDTO.getObjet_commerce());
  formulaire.setDate_creation(null);
  formulaire.setCapital(formulaireDTO.getCapital());
  formulaire savedFormulaire = formulaire_repo.save(formulaire);

  // Update the demande and set the id_formulaire
  Long demande_id = (long) formulaireDTO.getId_demande();
  log.info("Demande id: " + demande_id);
  Long formulaire_id = savedFormulaire.getId();
  log.info("Formulaire id: " + formulaire_id);
  demande demande = demande_repo.findById(demande_id).orElse(null);
  log.info("Demande: " + demande);
  if (demande != null) {
    demande.setId_formulaire(formulaire_id);
    log.info("Demande id formulaire: " + demande.getId_formulaire());
    demande_repo.save(demande);
    log.info("Demande saved with id formulaire");
  } else {
    log.error("Demande not found for id: " + demande_id);
    return ResponseEntity.badRequest().body("Demande not found");
  }
  return ResponseEntity.ok("Formulaire saved with success");
}

  @PostMapping("/add_document")
  public ResponseEntity<String> addDocument(@RequestParam("id") float id, @RequestParam("id_demande") float id_demande, @RequestParam("cin_representant") MultipartFile cin_representant, @RequestParam("declaration_immatriculation") MultipartFile declaration_immatriculation, @RequestParam("attestaion_inscription_taxe") MultipartFile attestaion_inscription_taxe, @RequestParam("prove_domicile") MultipartFile prove_domicile, @RequestParam("certificat_negatif") MultipartFile certificat_negatif, @RequestParam("procuration") MultipartFile procuration, @RequestParam("procureur_cin") MultipartFile procureur_cin) throws IOException {
    DocumentDTO documentDTO = new DocumentDTO();
    documentDTO.setId(id);
    documentDTO.setId_demande(id_demande);
    documentDTO.setCin_representant(cin_representant);
    documentDTO.setDeclaration_immatriculation(declaration_immatriculation);
    documentDTO.setAttestaion_inscription_taxe(attestaion_inscription_taxe);
    documentDTO.setProve_domicile(prove_domicile);
    documentDTO.setCertificat_negatif(certificat_negatif);
    documentDTO.setProcuration(procuration);
    documentDTO.setProcureur_cin(procureur_cin);
    return ResponseEntity.ok("Document added successfully " + documentService.saveDocument(documentDTO));
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
