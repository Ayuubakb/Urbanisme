package com.UserEspace.Services;

import com.UserEspace.Repositories.demande_repo;
import com.UserEspace.Repositories.formulaire_repo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class procurration_prob {

  @Autowired
 private final formulaire_repo formulaire_repo;
  @Autowired
  private final demande_repo demande_repo;

  public void matchprocurationDemandeFormulaire(Long id_demande){
    formulaire_repo.findById_demande(id_demande).ifPresent(formulaire -> {
      demande_repo.findById(id_demande).ifPresent(demande -> {
        demande.set_procureur(formulaire.getProcuration());
        demande.setStatus("En cours");
        demande_repo.save(demande);
      });
    });
  }
}
