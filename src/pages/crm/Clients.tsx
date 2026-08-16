import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Edit3, Plus, Search, Trash2, Upload, Users } from 'lucide-react';

type Customer = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  archived_at?: string | null;
};

type CustomerForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
};

const emptyForm: CustomerForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  notes: '',
};

const normalizeName = (value?: string | null) => (value || '').trim().replace(/\s+/g, ' ').toLowerCase();
const normalizeEmail = (value?: string | null) => (value || '').trim().toLowerCase();
const normalizePhone = (value?: string | null) => (value || '').replace(/\D/g, '');

const Clients = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTab, setDialogTab] = useState<'single' | 'paste'>('single');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CustomerForm>(emptyForm);
  const [pasteValue, setPasteValue] = useState('');
  const [saving, setSaving] = useState(false);

  const customersTable = supabase.from('customers') as any;

  const loadCustomers = async () => {
    setLoading(true);
    const { data, error } = await customersTable
      .select('id,name,email,phone,address,notes,created_at,updated_at,archived_at')
      .is('archived_at', null)
      .order('updated_at', { ascending: false });

    if (error) {
      toast({
        title: 'Could not load clients',
        description: error.message,
        variant: 'destructive',
      });
      setCustomers([]);
    } else {
      setCustomers((data || []) as Customer[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return customers;

    return customers.filter((customer) =>
      [customer.name, customer.email, customer.phone, customer.address, customer.notes]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    );
  }, [customers, search]);

  const allFilteredSelected = filteredCustomers.length > 0 && filteredCustomers.every((customer) => selectedIds.has(customer.id));

  const toggleCustomer = (id: string, checked: boolean) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const toggleAllFiltered = (checked: boolean) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      filteredCustomers.forEach((customer) => {
        if (checked) next.add(customer.id);
        else next.delete(customer.id);
      });
      return next;
    });
  };

  const openAddDialog = (tab: 'single' | 'paste' = 'single') => {
    setEditingId(null);
    setForm(emptyForm);
    setPasteValue('');
    setDialogTab(tab);
    setDialogOpen(true);
  };

  const openEditDialog = (customer: Customer) => {
    setEditingId(customer.id);
    setDialogTab('single');
    setForm({
      name: customer.name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      address: customer.address || '',
      notes: customer.notes || '',
    });
    setDialogOpen(true);
  };

  const findDuplicate = (candidate: CustomerForm, excludeId?: string | null) => {
    const name = normalizeName(candidate.name);
    const email = normalizeEmail(candidate.email);
    const phone = normalizePhone(candidate.phone);

    return customers.find((customer) => {
      if (customer.id === excludeId) return false;
      if (name && normalizeName(customer.name) === name) return true;
      if (email && normalizeEmail(customer.email) === email) return true;
      if (phone && normalizePhone(customer.phone) === phone) return true;
      return false;
    });
  };

  const saveSingleCustomer = async () => {
    const cleaned: CustomerForm = {
      name: form.name.trim().replace(/\s+/g, ' '),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      notes: form.notes.trim(),
    };

    if (!cleaned.name) {
      toast({ title: 'Client name is required', variant: 'destructive' });
      return;
    }

    const duplicate = findDuplicate(cleaned, editingId);
    if (duplicate) {
      toast({
        title: 'Client already exists',
        description: `${duplicate.name} is already in the client list. Edit that client instead of creating a duplicate.`,
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    const payload = {
      name: cleaned.name,
      email: cleaned.email || null,
      phone: cleaned.phone || null,
      address: cleaned.address || null,
      notes: cleaned.notes || null,
      updated_at: new Date().toISOString(),
    };

    const request = editingId
      ? customersTable.update(payload).eq('id', editingId)
      : customersTable.insert(payload);

    const { error } = await request;
    setSaving(false);

    if (error) {
      toast({
        title: editingId ? 'Could not update client' : 'Could not add client',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: editingId ? 'Client updated' : 'Client added',
      description: cleaned.name,
    });
    setDialogOpen(false);
    await loadCustomers();
  };

  const parsePastedCustomers = () => {
    return pasteValue
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const delimiter = line.includes('\t') ? '\t' : line.includes('|') ? '|' : line.includes(',') ? ',' : null;
        const parts = delimiter ? line.split(delimiter).map((part) => part.trim()) : [line];
        return {
          name: parts[0] || '',
          email: parts[1] || '',
          phone: parts[2] || '',
          address: parts[3] || '',
          notes: parts.slice(4).join(' ').trim(),
        } satisfies CustomerForm;
      })
      .filter((customer) => customer.name);
  };

  const importPastedCustomers = async () => {
    const parsed = parsePastedCustomers();
    if (parsed.length === 0) {
      toast({ title: 'Paste at least one client name', variant: 'destructive' });
      return;
    }

    const existingNames = new Set(customers.map((customer) => normalizeName(customer.name)).filter(Boolean));
    const existingEmails = new Set(customers.map((customer) => normalizeEmail(customer.email)).filter(Boolean));
    const existingPhones = new Set(customers.map((customer) => normalizePhone(customer.phone)).filter(Boolean));
    const batchNames = new Set<string>();
    const batchEmails = new Set<string>();
    const batchPhones = new Set<string>();

    const toInsert: CustomerForm[] = [];
    let skipped = 0;

    parsed.forEach((customer) => {
      const name = normalizeName(customer.name);
      const email = normalizeEmail(customer.email);
      const phone = normalizePhone(customer.phone);
      const isDuplicate =
        (name && (existingNames.has(name) || batchNames.has(name))) ||
        (email && (existingEmails.has(email) || batchEmails.has(email))) ||
        (phone && (existingPhones.has(phone) || batchPhones.has(phone)));

      if (isDuplicate) {
        skipped += 1;
        return;
      }

      toInsert.push({
        name: customer.name.trim().replace(/\s+/g, ' '),
        email: customer.email.trim(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        notes: customer.notes.trim(),
      });
      if (name) batchNames.add(name);
      if (email) batchEmails.add(email);
      if (phone) batchPhones.add(phone);
    });

    if (toInsert.length === 0) {
      toast({
        title: 'No new clients to add',
        description: `${skipped} duplicate${skipped === 1 ? '' : 's'} skipped.`,
      });
      return;
    }

    setSaving(true);
    const rows = toInsert.map((customer) => ({
      name: customer.name,
      email: customer.email || null,
      phone: customer.phone || null,
      address: customer.address || null,
      notes: customer.notes || null,
    }));
    const { error } = await customersTable.insert(rows);
    setSaving(false);

    if (error) {
      toast({ title: 'Could not import clients', description: error.message, variant: 'destructive' });
      return;
    }

    toast({
      title: `${rows.length} client${rows.length === 1 ? '' : 's'} added`,
      description: skipped > 0 ? `${skipped} duplicate${skipped === 1 ? '' : 's'} skipped.` : undefined,
    });
    setDialogOpen(false);
    setPasteValue('');
    await loadCustomers();
  };

  const archiveClients = async (ids: string[]) => {
    if (ids.length === 0) return;

    const confirmed = window.confirm(
      `Remove ${ids.length} client${ids.length === 1 ? '' : 's'} from the active client list? Their quote, booking, invoice and job history will be kept.`
    );
    if (!confirmed) return;

    const { error } = await customersTable
      .update({ archived_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .in('id', ids);

    if (error) {
      toast({ title: 'Could not remove clients', description: error.message, variant: 'destructive' });
      return;
    }

    toast({ title: `${ids.length} client${ids.length === 1 ? '' : 's'} removed` });
    setSelectedIds(new Set());
    await loadCustomers();
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Clients</h1>
              <p className="text-xs text-muted-foreground">{customers.length} active client{customers.length === 1 ? '' : 's'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => openAddDialog('paste')}>
              <Upload className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Paste clients</span>
              <span className="sm:hidden">Paste</span>
            </Button>
            <Button size="sm" onClick={() => openAddDialog('single')}>
              <Plus className="mr-2 h-4 w-4" />
              Add client
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto space-y-4 px-4 py-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5" />
                  Client list
                </CardTitle>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {selectedIds.size > 0 && (
                  <>
                    <span className="text-sm text-muted-foreground">{selectedIds.size} selected</span>
                    <Button variant="destructive" size="sm" onClick={() => archiveClients(Array.from(selectedIds))}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove selected
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email, phone or address..."
                className="pl-9"
              />
            </div>

            {!loading && filteredCustomers.length > 0 && (
              <div className="flex items-center gap-2 border-b pb-3">
                <Checkbox
                  id="select-all-clients"
                  checked={allFilteredSelected}
                  onCheckedChange={(checked) => toggleAllFiltered(Boolean(checked))}
                />
                <Label htmlFor="select-all-clients" className="cursor-pointer text-sm">
                  Select all {filteredCustomers.length} shown
                </Label>
              </div>
            )}

            {loading ? (
              <div className="py-12 text-center text-sm text-muted-foreground">Loading clients...</div>
            ) : filteredCustomers.length === 0 ? (
              <div className="py-12 text-center">
                <Users className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                <p className="font-medium">No clients found</p>
                <p className="mt-1 text-sm text-muted-foreground">Add one manually or paste a list of names.</p>
              </div>
            ) : (
              <div className="divide-y rounded-md border">
                {filteredCustomers.map((customer) => (
                  <div key={customer.id} className="flex items-start gap-3 p-3 sm:p-4">
                    <Checkbox
                      checked={selectedIds.has(customer.id)}
                      onCheckedChange={(checked) => toggleCustomer(customer.id, Boolean(checked))}
                      aria-label={`Select ${customer.name}`}
                      className="mt-1"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{customer.name}</p>
                          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
                            {customer.email && <span>{customer.email}</span>}
                            {customer.phone && <span>{customer.phone}</span>}
                            {customer.address && <span>{customer.address}</span>}
                          </div>
                          {customer.notes && <p className="mt-2 text-sm text-muted-foreground">{customer.notes}</p>}
                        </div>
                        <div className="mt-2 flex shrink-0 gap-2 sm:mt-0">
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(customer)}>
                            <Edit3 className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => archiveClients([customer.id])}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit client' : 'Add clients'}</DialogTitle>
            <DialogDescription>
              {editingId
                ? 'Update the client details below.'
                : 'Add one client manually or paste many names at once.'}
            </DialogDescription>
          </DialogHeader>

          {editingId ? (
            <div className="grid gap-4 py-2">
              <CustomerFields form={form} setForm={setForm} />
            </div>
          ) : (
            <Tabs value={dialogTab} onValueChange={(value) => setDialogTab(value as 'single' | 'paste')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="single">Single client</TabsTrigger>
                <TabsTrigger value="paste">Paste multiple</TabsTrigger>
              </TabsList>
              <TabsContent value="single" className="mt-4">
                <div className="grid gap-4">
                  <CustomerFields form={form} setForm={setForm} />
                </div>
              </TabsContent>
              <TabsContent value="paste" className="mt-4 space-y-3">
                <div>
                  <Label htmlFor="paste-clients">Paste names or rows</Label>
                  <Textarea
                    id="paste-clients"
                    value={pasteValue}
                    onChange={(event) => setPasteValue(event.target.value)}
                    placeholder={'One name per line works:\nJane Smith\nJohn Brown\n\nOr paste: Name | Email | Phone | Address'}
                    className="mt-2 min-h-[220px] font-mono text-sm"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Duplicate names, emails and phone numbers are skipped automatically.
                </p>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button
              onClick={editingId || dialogTab === 'single' ? saveSingleCustomer : importPastedCustomers}
              disabled={saving}
            >
              {saving ? 'Saving...' : editingId ? 'Save changes' : dialogTab === 'paste' ? 'Import clients' : 'Add client'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const CustomerFields = ({
  form,
  setForm,
}: {
  form: CustomerForm;
  setForm: React.Dispatch<React.SetStateAction<CustomerForm>>;
}) => (
  <>
    <div>
      <Label htmlFor="client-name">Name *</Label>
      <Input
        id="client-name"
        value={form.name}
        onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
        placeholder="Client name"
        className="mt-2"
      />
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <Label htmlFor="client-email">Email</Label>
        <Input
          id="client-email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          placeholder="name@example.com"
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="client-phone">Phone</Label>
        <Input
          id="client-phone"
          value={form.phone}
          onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
          placeholder="604-555-0123"
          className="mt-2"
        />
      </div>
    </div>
    <div>
      <Label htmlFor="client-address">Address</Label>
      <Input
        id="client-address"
        value={form.address}
        onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
        placeholder="Service address"
        className="mt-2"
      />
    </div>
    <div>
      <Label htmlFor="client-notes">Notes</Label>
      <Textarea
        id="client-notes"
        value={form.notes}
        onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
        placeholder="Optional notes"
        className="mt-2"
      />
    </div>
  </>
);

export default Clients;
