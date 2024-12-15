package GeographyService.GeographyService.Controller;

import GeographyService.GeographyService.DTOs.RegionDTO;
import GeographyService.GeographyService.Model.Region;
import GeographyService.GeographyService.Repositories.RegionRepository;
import GeographyService.GeographyService.Utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/geography/region")
public class RegionController {
    @Autowired
    RegionRepository regionRepository;
    @Autowired
    Utils utils;
    @PostMapping("/create")
    public ResponseEntity<String> createRegion(@RequestBody Region region) {
        region.setNom_region(region.getNom_region().toLowerCase());
        Optional<Region> rExists=regionRepository.findByName(region.getNom_region());
        if(rExists.isPresent())
            return new ResponseEntity<>(region.getNom_region()+ " Existe déjà", HttpStatus.BAD_REQUEST);
        try {
            regionRepository.save(region);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(region.getNom_region()+ " est créer", HttpStatus.CREATED );
    }
    @GetMapping("/get/all")
    public ResponseEntity<List<RegionDTO>> getAllRegion() {
        List<Region> regions;
        try{
            regions=regionRepository.findAll();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        System.out.println(regions);
        return new ResponseEntity<>(utils.generateRegionDTOList(regions), HttpStatus.OK);
    }

}
