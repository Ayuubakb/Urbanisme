package GeographyService.GeographyService.Controller;

import GeographyService.GeographyService.DTOs.ZoneDTO;
import GeographyService.GeographyService.Model.Region;
import GeographyService.GeographyService.Model.Ville;
import GeographyService.GeographyService.Model.Zone;
import GeographyService.GeographyService.Repositories.ZoneRepository;
import GeographyService.GeographyService.Utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/geography/zone")
public class ZoneController {
    @Autowired
    ZoneRepository zoneRepository;
    @Autowired
    Utils utils;

    @PostMapping("/create")
    public ResponseEntity<String> createZone(@RequestBody Zone zone) {
        zone.setNom_zone(zone.getNom_zone().toLowerCase());
        Optional<Zone> zExists=zoneRepository.findByName(zone.getNom_zone());
        if(zExists.isPresent())
            return new ResponseEntity<>(zone.getNom_zone()+ " Existe déjà", HttpStatus.BAD_REQUEST);
        try {
            zoneRepository.save(zone);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(zone.getNom_zone()+ " est créer", HttpStatus.CREATED );
    }

    @GetMapping("/getByVille/{id}")
    public ResponseEntity<List<ZoneDTO>> getCityByRegion(@PathVariable int id){
        List<Zone> zones;
        try{
            zones=zoneRepository.findByVille(id);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(utils.generateZoneDTOList(zones), HttpStatus.OK);
    }
}
