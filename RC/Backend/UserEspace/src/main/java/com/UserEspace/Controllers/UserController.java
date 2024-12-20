package com.UserEspace.Controllers;

import com.UserEspace.DTOs.DemandeDTO;
import com.UserEspace.DTOs.FormulaireDTO;
import com.UserEspace.DTOs.documentTranser;
import com.UserEspace.DTOs.userDto;
import com.UserEspace.Models.*;
import com.UserEspace.Repositories.*;
import com.UserEspace.Services.RegisterService;
import com.UserEspace.Services.documentService;
import com.UserEspace.Services.procurration_prob;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/userSpace")
@RequiredArgsConstructor
@Slf4j
public class UserController {
  private final user_repo user_repo;
  private final demande_repo demande_repo;
  private final formulaire_repo formulaire_repo;
  private final documentService documentService;
  private final payementRepo payementRepo;
  private final com.UserEspace.Repositories.document_repo document_repo;
  private final procurration_prob procurration_prob;
  private final register_repo register_repo;
  private final RegisterService registerService;

  @GetMapping("/profile/{id}")
  public ResponseEntity<userDto> getProfile(@PathVariable Long id) {
    user user = user_repo.findById(Float.valueOf(id)).isPresent() ? user_repo.findById(Float.valueOf(id)).get() : null;
    if (user == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(userDto.builder().nom(user.getNom()).prenom(user.getPrenom()).build());
  }

  @PostMapping("/add_demande/{id}/{is_procure}")
  public ResponseEntity<Long> addDemande(@PathVariable Long id, @PathVariable boolean is_procure) {
    user user = user_repo.findById(Float.valueOf(id)).orElse(null);
    if (user == null) {
      return ResponseEntity.badRequest().body(null);
    }
    demande demande = new demande();
    demande.setId_user(id);
    demande.set_procureur(is_procure);
    demande.setStatus("En cours");
    demande savedDemande = demande_repo.save(demande);
    return ResponseEntity.ok(savedDemande.getId());
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
  public ResponseEntity<String> addDocument(
    @RequestParam("id_demande") Long id_demande,
    @RequestParam("cin_representant") MultipartFile cin_representant,
    @RequestParam("declaration_immatriculation") MultipartFile declaration_immatriculation,
    @RequestParam("attestaion_inscription_taxe") MultipartFile attestaion_inscription_taxe,
    @RequestParam("prove_domicile") MultipartFile prove_domicile,
    @RequestParam("certificat_negatif") MultipartFile certificat_negatif,
    @RequestParam(value = "procuration", required = false) MultipartFile procuration,
    @RequestParam(value = "procureur_cin", required = false) MultipartFile procureur_cin) throws IOException {

    log.info("Received request to add document for demande id: " + id_demande);

    demande demande = demande_repo.findById(id_demande).orElse(null);
    if (demande == null) {
      log.error("Demande not found for id: " + id_demande);
      return ResponseEntity.notFound().build();
    }
    log.info("Demande found: " + demande);

    document saveddocument;
    if (demande.is_procureur()) {
      saveddocument = documentService.saveDocumentWithProcureur(id_demande, cin_representant, declaration_immatriculation, attestaion_inscription_taxe, prove_domicile, certificat_negatif, procuration, procureur_cin);
    } else {
      saveddocument = documentService.saveDocumentWithoutProcureur(id_demande, cin_representant, declaration_immatriculation, attestaion_inscription_taxe, prove_domicile, certificat_negatif);
    }
    demande.setId_document(saveddocument.getId());
    demande_repo.save(demande);
    log.info("Document saved with success");
    return ResponseEntity.ok("Document saved with success");
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
      if (!demande.getStatus().equals("payed")) {
        result.add(new DemandeDTO(demande));
      }
    }
    return ResponseEntity.ok(result);
  }

  @GetMapping("/get_formulaire/{id}")
  public ResponseEntity<FormulaireDTO> getFormulaire(@PathVariable Float id) {
    //we will use the id of the demande to get the formulaire
    formulaire formulaire = formulaire_repo.findById_demande(id).isPresent() ? formulaire_repo.findById_demande(id).get() : null;
    if (formulaire == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(FormulaireDTO.builder().id(formulaire.getId()).id_demande(formulaire.getId_demande()).nom(formulaire.getNom()).prenom(formulaire.getPrenom()).cin(formulaire.getCin()).procuration(formulaire.getProcuration()).adresse(formulaire.getAdresse()).nr_chronologique(formulaire.getNr_chronologique()).ice(formulaire.getIce()).benificiaire_nom(formulaire.getBenificiaire_nom()).benificiaire_prenom(formulaire.getBenificiaire_prenom()).benificiaire_cin(formulaire.getBenificiaire_cin()).objet_commerce(formulaire.getObjet_commerce()).capital(formulaire.getCapital()).build());
  }

  @PutMapping("/update_formulaire/{id}")
  public ResponseEntity<String> updateFormulaire(@PathVariable Long id, @RequestBody FormulaireDTO formulaireDTO) {
    log.info("Updating formulaire with id: " + id);
    formulaire formulaire = formulaire_repo.findById_demande(id).isPresent() ? formulaire_repo.findById_demande(id).get() : null;
    if (formulaire == null) {
      log.error("Formulaire not found for id: " + id);
      return ResponseEntity.notFound().build();
    }
    formulaire.setNom(formulaireDTO.getNom());
    formulaire.setPrenom(formulaireDTO.getPrenom());
    formulaire.setCin(formulaireDTO.getCin());
    formulaire.setAdresse(formulaireDTO.getAdresse());
    formulaire.setNr_chronologique(formulaireDTO.getNr_chronologique());
    formulaire.setIce(formulaireDTO.getIce());
    formulaire.setBenificiaire_nom(formulaireDTO.getBenificiaire_nom());
    formulaire.setBenificiaire_prenom(formulaireDTO.getBenificiaire_prenom());
    formulaire.setBenificiaire_cin(formulaireDTO.getBenificiaire_cin());
    formulaire.setObjet_commerce(formulaireDTO.getObjet_commerce());
    formulaire.setCapital(formulaireDTO.getCapital());
    formulaire.setProcuration(formulaireDTO.getProcuration());
    formulaire_repo.save(formulaire);
    log.info("Formulaire updated successfully for id: " + id);
    procurration_prob.matchprocurationDemandeFormulaire(formulaire.getId_demande());
    return ResponseEntity.ok("Formulaire updated successfully");
  }

  @Transactional
  @PostMapping("/delete_demande/{id}")
  public ResponseEntity<String> deleteDemande(@PathVariable Long id) {
    demande demande = demande_repo.findById(id).isPresent() ? demande_repo.findById(id).get() : null;
    if (demande == null) {
      return ResponseEntity.notFound().build();
    }
    demande_repo.deleteDocumentByDemandeId(id);
    demande_repo.deleteFormulaireByDemandeId(id);
    demande_repo.deletePayementByDemandeId(id);
    demande_repo.deleteDemandeById(id);
    return ResponseEntity.ok("Demande deleted successfully");
  }

  //get document by id demande
  @GetMapping("/get_document/{id}")
  public ResponseEntity<documentTranser> getDocument(@PathVariable Long id) {
    document document = document_repo.findById_demande(id).isPresent() ? document_repo.findById_demande(id).get() : null;
    if (document == null) {
      return ResponseEntity.notFound().build();
    }
    document_repo.findById_demande(id).get();
    documentTranser documentTranser =
      com.UserEspace.DTOs.documentTranser.builder()
        .attestaion_inscription_taxe(document.getAttestaion_inscription_taxe())
        .certificat_negatif(document.getCertificat_negatif())
        .cin_representant(document.getCin_representant())
        .declaration_immatriculation(document.getDeclaration_immatriculation())
        .procuration(document.getProcuration())
        .procureur_cin(document.getProcureur_cin())
        .prove_domicile(document.getProve_domicile())
        .build();
    return ResponseEntity.ok(documentTranser);
  }

  @PutMapping("/update_document/{id}")
  public ResponseEntity<String> updateDocument(
    @PathVariable Long id,
    @RequestParam("cin_representant") MultipartFile cin_representant,
    @RequestParam("declaration_immatriculation") MultipartFile declaration_immatriculation,
    @RequestParam("attestaion_inscription_taxe") MultipartFile attestaion_inscription_taxe,
    @RequestParam("prove_domicile") MultipartFile prove_domicile,
    @RequestParam("certificat_negatif") MultipartFile certificat_negatif,
    @RequestParam(value = "procuration", required = false) MultipartFile procuration,
    @RequestParam(value = "procureur_cin", required = false) MultipartFile procureur_cin) throws IOException {

    document document = document_repo.findById_demande(id).orElse(null);
    if (document == null) {
      return ResponseEntity.notFound().build();
    }

    if (demande_repo.findById(id).get().is_procureur()) {
      document.setProcuration(procuration.getBytes());
      document.setProcureur_cin(procureur_cin.getBytes());
    } else {
      document.setProcuration(null);
      document.setProcureur_cin(null);
    }

    document.setAttestaion_inscription_taxe(attestaion_inscription_taxe.getBytes());
    document.setCertificat_negatif(certificat_negatif.getBytes());
    document.setCin_representant(cin_representant.getBytes());
    document.setDeclaration_immatriculation(declaration_immatriculation.getBytes());
    document.setProve_domicile(prove_domicile.getBytes());

    document_repo.save(document);
    procurration_prob.matchprocurationDemandeFormulaire(id);
    return ResponseEntity.ok("Document updated successfully");
  }

  //add payement using demande id
  @PostMapping("/add_payement/{id}")
  public ResponseEntity<String> addPayement(@PathVariable Long id) {
    demande demande = demande_repo.findById(id).orElse(null);
    if (demande == null) {
      return ResponseEntity.notFound().build();
    }
    //check if demande status is approved
    if (demande.getStatus().equals("approved")) {
      //create a new payement
      payement payement = new payement();
      payement.setDate_payement(
        new java.sql.Date(System.currentTimeMillis()));
      payement.setId_demande(id);
      payement payement1 = payementRepo.save(payement);
      //update demande status
      demande.setStatus("payed");
      demande.setId_payement(payement1.getId());
      demande_repo.save(demande);
      //create the register for the payement
      register register = new register();
      String code = UUID.randomUUID().toString();
      register.setCode(code);
      register.setId_demande(id);
      register.setDemande(demande);
      register register1 = register_repo.save(register);
      //generate the register pdf
      byte[] registerPdf = registerService.generatePdf(id);
      register1.setFile(registerPdf);
      register_repo.save(register1);
      return ResponseEntity.ok("Payement added successfully");
    } else {
      return ResponseEntity.badRequest().body("Demande not approved!");
    }
  }

  @GetMapping("/get_register/{id}")
  public ResponseEntity<byte[]> getRegister(@PathVariable Long id) {
    register register = register_repo.findByIdDemande(id);
    if (register == null) {
      return ResponseEntity.notFound().build();
    }
    // Check if the PDF file is already generated
    byte[] registerPdf = register.getFile();
    if (registerPdf == null || registerPdf.length == 0) {
      // Regenerate the register PDF if not present
      registerPdf = registerService.generatePdf(id);
      register.setFile(registerPdf);
      register_repo.save(register);
    }
    return ResponseEntity.ok()
      .header("Content-Disposition", "attachment; filename=register.pdf")
      .body(registerPdf);
  }

  @GetMapping("/demandes/payed/{id}")
  public ResponseEntity<List<DemandeDTO>> getPayeddemande(
    @PathVariable Long id) {
    List<demande> demandes = demande_repo.findAllByUserId(id);
    if (demandes.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    List<DemandeDTO> result = new ArrayList<>(demandes.size());
    for (demande demande : demandes) {
      if (demande.getStatus().equals("payed")) {
        result.add(new DemandeDTO(demande));
      }
    }
    return ResponseEntity.ok(result);
  }


}
