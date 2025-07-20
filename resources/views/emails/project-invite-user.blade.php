@component('mail::message')
# You're Invited!

Hello,

You’ve been invited to join the project

Click the button below to accept the invitation.

@component('mail::button', ['url' => $acceptUrl])
Accept Invitation
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
