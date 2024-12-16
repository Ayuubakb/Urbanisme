package com.WorkerService.WorkerService.Controller;

import com.WorkerService.WorkerService.DTO.WorkerProfile;
import com.WorkerService.WorkerService.DTO.motif;
import com.WorkerService.WorkerService.Model.demande;
import com.WorkerService.WorkerService.Model.worker;
import com.WorkerService.WorkerService.Repo.demande_repo;
import com.WorkerService.WorkerService.Repo.worker_repo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/worker")
@Slf4j
public class WorkerController {

  private final worker_repo workerRepo;
  private final demande_repo demandeRepo;

  public WorkerController(worker_repo workerRepo, demande_repo demandeRepo) {
    this.workerRepo = workerRepo;
    this.demandeRepo = demandeRepo;
  }

  //get all demands
  @GetMapping("/profile/{id}")
  public ResponseEntity<WorkerProfile> getWorkerProfile(
    @PathVariable("id") Long id) {
    //find the worker by id
    worker worker = workerRepo.findById(id).orElse(null);
    if (worker == null) {
      return ResponseEntity.notFound().build();
    } else {
      String nom = worker.getNom();
      String prenom = worker.getPrenom();
      String matriculation = worker.getMatriculation();
      WorkerProfile workerProfile = new WorkerProfile(nom, prenom, matriculation);

      return ResponseEntity.ok(workerProfile);
    }
  }
  @GetMapping("/demandes")
  public ResponseEntity<List<Long>> getdemandes() {
    List<Long> demandes = workerRepo.demandeByStatus();
    return ResponseEntity.ok(demandes);
  }
  @PutMapping("/acepteDeamnde/{id}")
  public ResponseEntity<String> accepteDemande(@PathVariable("id") Long id) {
    //check if the demande exists
    if (demandeRepo.findById(id).isPresent()){
      //find the demande and set status to approved
      demande demande= demandeRepo.findById(id).get();
      demande.setStatus("approved");
      demandeRepo.save(demande);
      return ResponseEntity.ok("Demande accepted");
    }else {
      return ResponseEntity.notFound().build();
    }
  }
  @PutMapping("/refuseDemande/{id}")
  public ResponseEntity<String> refuseDemande(@PathVariable("id") Long id,
                                              @RequestBody motif motif
                                                ) {
    //check if the demande exists
    if (demandeRepo.findById(id).isPresent()){
      //find the demande and set status to refused
      demande demande= demandeRepo.findById(id).get();
      demande.setStatus("REFUSED");
      demande.setMotif(motif.getMotif());
      demandeRepo.save(demande);
      return ResponseEntity.ok("Demande refused");
    }else {
      return ResponseEntity.notFound().build();
    }
  }
}
