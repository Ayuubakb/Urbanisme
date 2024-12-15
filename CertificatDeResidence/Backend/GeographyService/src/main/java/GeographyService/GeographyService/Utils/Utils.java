package GeographyService.GeographyService.Utils;

import GeographyService.GeographyService.DTOs.RegionDTO;
import GeographyService.GeographyService.DTOs.VilleDTO;
import GeographyService.GeographyService.DTOs.ZoneDTO;
import GeographyService.GeographyService.Model.Region;
import GeographyService.GeographyService.Model.Ville;
import GeographyService.GeographyService.Model.Zone;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class Utils {
    public ZoneDTO generateZoneDTO(Zone zone){
        ZoneDTO zoneDTO = new ZoneDTO(
                zone.getId_zone(),
                zone.getNom_zone(),
                zone.getVille().getNom_ville()
        );
        return zoneDTO;
    }
    public List<ZoneDTO> generateZoneDTOList(List<Zone> zones){
        List<ZoneDTO> zoneDTOList = new ArrayList<>();
        for (Zone zone : zones) {
            zoneDTOList.add(generateZoneDTO(zone));
        }
        return zoneDTOList;
    }

    public VilleDTO generateVilleDTO(Ville ville){
        ArrayList<ZoneDTO> zones=new ArrayList<>();
        for(Zone zone : ville.getZones()){
            zones.add(
                    new ZoneDTO(
                        zone.getId_zone(),
                            zone.getNom_zone()
                    )
            );
        }
        VilleDTO villeDTO = new VilleDTO(
                ville.getId_ville(),
                ville.getNom_ville(),
                ville.getRegion().getNom_region(),
                zones
        );
        return villeDTO;
    }

    public List<VilleDTO> generateVilleDTOList(List<Ville> villes){
        List<VilleDTO> villeDTOs=new ArrayList<>();
        for(Ville ville : villes){
            villeDTOs.add(generateVilleDTO(ville));
        }
        return villeDTOs;
    }

    public RegionDTO generateRegionDTO(Region region){
        ArrayList<VilleDTO> villes=new ArrayList<>();
        for(Ville ville : region.getVilles()) {
            villes.add(
                new VilleDTO(
                    ville.getId_ville(),
                    ville.getNom_ville()
                )
            );
        }
        RegionDTO regionDTO = new RegionDTO(
          region.getId_region(),
          region.getNom_region(),
          villes
        );
        return regionDTO;
    }

    public List<RegionDTO> generateRegionDTOList(List<Region> regions){
        List<RegionDTO> regionDTOs=new ArrayList<>();
        for(Region region : regions){
            regionDTOs.add(generateRegionDTO(region));
        }
        return regionDTOs;
    }
}
