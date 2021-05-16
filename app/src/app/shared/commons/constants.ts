import { IDropdown } from '@commons/structures';

export class Constants {
    // Routes
    public static readonly CONFIG_URL: string = 'configs';
    public static readonly BUILD_URL: string = 'build';
    public static readonly STORE_URL: string = 'store';
    public static readonly WORKFLOW_URL: string = 'workflow';

    // Status
    public static readonly BUILD_STATUS_KEY: string = 'status';
    public static readonly BUILD_MESSAGES_KEY: string = 'messages';
    public static readonly BUILD_STATUS_VALUES: Array<string> = [
        'Success',
        'pending',
        'Error'
    ];

    // Build Type Dropdown Value
    public static readonly TYPES: IDropdown[] = [
        { text: 'Build Application', value: 'build' },
        { text: 'Node Package Install', value: 'install' },
        { text: 'Git Pull', value: 'pull' },
    ];
}
