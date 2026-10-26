import type {
    HyperinventoryLoginCompanyDto,
    HyperinventoryLoginResponseDto,
    HyperinventoryLoginUserDto,
} from "@/types/dto/hyperinventory/auth.dto";
import type { AuthCompanyModel, AuthSessionModel, AuthUserModel } from "@/types/models/auth.model";

function mapUser(dto: HyperinventoryLoginUserDto): AuthUserModel {
    const firstName = dto.first_name ?? "";
    const lastName = dto.last_name ?? "";

    return {
        id: dto.id,
        username: dto.username ?? "",
        email: dto.email ?? "",
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`.trim() || dto.username || dto.email || "",
        roleName: dto.role?.display_name ?? "",
        dataScope: dto.role?.data_scope ?? "",
    };
}

function mapCompany(dto: HyperinventoryLoginCompanyDto): AuthCompanyModel {
    return {
        id: dto.id,
        name: dto.name ?? "",
        email: dto.contact_email ?? "",
        mobileNumber: dto.contact_mobile_number ?? "",
        accountId: dto.account_id ?? "",
        isVerified: Boolean(dto.is_verified),
        isActive: Boolean(dto.is_active),
    };
}

export function mapLoginResponseToSession(dto: HyperinventoryLoginResponseDto): AuthSessionModel {
    return {
        accessToken: dto.access_token,
        refreshToken: dto.refresh_token,
        tokenType: dto.token_type || "Bearer",
        expiresIn: Number(dto.expires_in) || 0,
        user: mapUser(dto.user),
        company: mapCompany(dto.company),
    };
}
