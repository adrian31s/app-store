package app.product.types.hard_drive.service;

import app.product.types.hard_drive.model.HardDrive;
import app.product.types.hard_drive.model.HardDriveDTO;
import org.mapstruct.Mapper;

@Mapper()
public interface HardDriveMapper {
    HardDriveDTO mapToDTO(HardDrive hardDrive);
}
