package GeographyService.GeographyService.Controller;

import GeographyService.GeographyService.DTOs.VilleDTO;
import GeographyService.GeographyService.Model.Ville;
import GeographyService.GeographyService.Repositories.VilleRepository;
import GeographyService.GeographyService.Utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/geography/city")
public class VilleController {
    @Autowired
    VilleRepository villeRepository;
    @Autowired
    Utils utils;

    @PostMapping("/create")
    public ResponseEntity<String> createCity(@RequestBody Ville ville) {
        ville.setNom_ville(ville.getNom_ville().toLowerCase());
        Optional<Ville> vExists = villeRepository.findByNom_ville(ville.getNom_ville());
        if(!vExists.isPresent()) {
            try {
                villeRepository.save(ville);
            } catch (Exception e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>(ville.getNom_ville()+ " est Créer", HttpStatus.CREATED);
        }
        return new ResponseEntity<>(ville.getNom_ville() + " Existe déjà",HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<VilleDTO>> getAllCity() {
        List<Ville> villes;
        try {
            villes = villeRepository.findAll();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(utils.generateVilleDTOList(villes), HttpStatus.OK);
    }

    @GetMapping("/getByRegion/{id}")
    public ResponseEntity<List<VilleDTO>> getCityByRegion(@PathVariable int id){
        List<Ville> villes;
        try{
            villes=villeRepository.findByRegion(id);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(utils.generateVilleDTOList(villes), HttpStatus.OK);
    }

}
