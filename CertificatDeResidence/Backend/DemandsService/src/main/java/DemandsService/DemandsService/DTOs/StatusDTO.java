package DemandsService.DemandsService.DTOs;

import DemandsService.DemandsService.Enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StatusDTO {
    private Status status;
    private String motif;
}
