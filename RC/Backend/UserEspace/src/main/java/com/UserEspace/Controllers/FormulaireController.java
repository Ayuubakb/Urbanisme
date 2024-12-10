package com.UserEspace.Controllers;


import com.UserEspace.DTOs.FormulaireDTO;
import com.UserEspace.Models.formulaire;
import com.UserEspace.Repositories.formulaire_repo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/formulaire")
public class FormulaireController {

  private final formulaire_repo formulaire_repo;

  public FormulaireController(com.UserEspace.Repositories.formulaire_repo formulaireRepo, com.UserEspace.Repositories.demande_repo demandeRepo, com.UserEspace.Repositories.user_repo userRepo) {
    formulaire_repo = formulaireRepo;
  }

  @GetMapping("/get_formulaire/{id}")
  public ResponseEntity<FormulaireDTO> getFormulaire(@PathVariable Float id) {
    //we will use the id of the demande to get the formulaire
    formulaire formulaire = formulaire_repo.findById_demande(id).isPresent() ? formulaire_repo.findById_demande(id).get() : null;
    if (formulaire == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(FormulaireDTO.builder().id(formulaire.getId()).id_demande(formulaire.getId_demande()).nom(formulaire.getNom()).prenom(formulaire.getPrenom()).cin(formulaire.getCin()).procuration(formulaire.getProcuration()).adresse(formulaire.getAdresse()).nr_chronologique(formulaire.getNr_chronologique()).ice(formulaire.getIce()).benificiaire_nom(formulaire.getBenificiaire_nom()).benificiaire_prenom(formulaire.getBenificiaire_prenom()).benificiaire_cin(formulaire.getBenificiaire_cin()).objet_commerce(formulaire.getObjet_commerce()).date_creation(formulaire.getDate_creation()).capital(formulaire.getCapital()).build());
  }
  @GetMapping("/update_formulaire/{id}")
  public ResponseEntity<String> updateFormulaire(@PathVariable Float id, @RequestBody FormulaireDTO formulaireDTO) {
    formulaire formulaire = formulaire_repo.findById(id).isPresent() ? formulaire_repo.findById(id).get() : null;
    if (formulaire == null) {
      return ResponseEntity.notFound().build();
    }
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
    formulaire.setCapital(formulaireDTO.getCapital());
    formulaire_repo.save(formulaire);
    return ResponseEntity.ok("Formulaire updated successfully");
  }
}
