package DemandsService.DemandsService.Services;

import DemandsService.DemandsService.Enums.Files_type;
import DemandsService.DemandsService.Models.Demandes;
import DemandsService.DemandsService.Models.Files;
import DemandsService.DemandsService.Repositories.FilesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FilesServices {
    @Autowired
    FilesRepository filesRepository;

    public Boolean prepareSingleFile(MultipartFile file, Files_type type, Files files) throws IOException {
        byte[] bytes=file.getBytes();
        String content_type=file.getContentType();
        switch(type) {
            case facture_electricite:
                try {
                    files.setFacture_electricite(bytes);
                    files.setFe_contenttype(content_type);
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                    return false;
                }
                return true;
            case certif_priorite:
                try {
                    files.setCertif_priorite(bytes);
                    files.setCpr_contenttype(content_type);
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                    return false;
                }
                return true;
            case document_emploie:
                try {
                    files.setDocument_emploie(bytes);
                    files.setDe_contenttype(content_type);
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                    return false;
                }
                return true;
            case certif_presence:
                try {
                    files.setCertif_presence(bytes);
                    files.setCp_contenttype(content_type);
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                    return false;
                }
                return true;
            default:
                return false;
        }
    }

    public Files prepareFiles(
            Boolean isMilitary,
            MultipartFile facture_electricite,
            MultipartFile certif_priorite,
            MultipartFile document_emploie,
            MultipartFile certif_presence) throws IOException {
        Files files=new Files();
        Boolean fe=prepareSingleFile(facture_electricite, Files_type.facture_electricite,files);
        Boolean cpr=prepareSingleFile(certif_priorite, Files_type.certif_priorite,files);
        Boolean de=prepareSingleFile(document_emploie, Files_type.document_emploie,files);
        Boolean cp=!isMilitary;
        if(isMilitary)
            cp = prepareSingleFile(certif_presence, Files_type.certif_presence, files);
        if(fe && cpr && de && cp)
            return files;
        return null;
    }
}
