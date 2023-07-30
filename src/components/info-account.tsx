import { Separator } from './ui/separator';

export function AccountInformation({ profile }: { profile: any}) {
    return (
        <div>
            <div className="space-y-1">
                <h4 className="text-sm font-medium leading-none">{profile.name}</h4>
                <Separator className="my-4" />
                <p className="text-sm text-muted-foreground">
                        Your instance is connected!
                </p>
            </div>
        </div>
    );
}
